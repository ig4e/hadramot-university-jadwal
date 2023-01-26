import { Loader, NumberInput, Tabs, TextInput } from "@mantine/core";
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import AddSubjectModal from "../../../components/subjects/AddSubjectModal";
import Button from "../../../components/ui/Button";
import ComboBox from "../../../components/ui/ComboBox";
import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";
import { DaysEnum, useNewTeacherStore } from "../../../stores/newTeacherStore";
import { trpc } from "../../../utils/trpc";
import dayjs from "dayjs";
import { TimePicker } from "antd";

import arAZ from "antd/locale/ar_EG";
import { useRouter } from "next/router";
import { useNotificationsStore } from "../../../stores/notificationsStore";

const DAYS_ARRAY: { value: DaysEnum; title: string }[] = [
	{ value: "SUNDAY", title: "الأحد" },
	{ value: "MONDAY", title: "الأثنين" },
	{ value: "TUESDAY", title: "الثلثاء" },
	{ value: "WEDNESDAY", title: "الأربعاء" },
	{ value: "THURSDAY", title: "الخميس" },
	{ value: "FRIDAY", title: "الجمعة" },
	{ value: "SATURDAY", title: "السبت" },
];

const format = "h:mm A";

function Index() {
	const router = useRouter();
	const teacherData = trpc.teacher.get.useQuery({
		id: Number(router.query.id),
	});
	const notificationsStore = useNotificationsStore();
	const teacherStore = useNewTeacherStore();
	const allSubjects = trpc.subject.list.useQuery({ limit: 250 });
	const createTeacherHook = trpc.teacher.create.useMutation();
	const avalabileSubjects = useMemo(() => {
		return (
			allSubjects.data?.items.filter(
				({ id, name, createdAt, updatedAt }) => {
					return !teacherStore.subjects.some(
						(subject) => subject.name === name,
					);
				},
			) || []
		);
	}, [teacherStore.subjects]);

	useEffect(() => {
		if (teacherData.data) {
			const { id, createdAt, name, subjects, updatedAt, workDays } =
				teacherData.data;

			console.log(subjects);
			console.log(workDays);

			for (let subject of subjects) {
				teacherStore.addSubject(subject as any);
			}

			for (let workDay of workDays) {
				workDay.dates.map((date) => {
					teacherStore.addWorkDayDate(workDay.day.name as any, {
						startAt: date.startAt as unknown as number,
						endAt: date.endAt as unknown as number,
						inputId: String(date.id),
					});
				});
			}
		}
	}, [teacherData.data]);

	useEffect(() => {
		teacherStore.clear();
	}, []);

	async function teacherSubmit() {
		try {
			const teacher = await createTeacherHook.mutateAsync({
				name: teacherStore.name,
				subjects: teacherStore.subjects,
				workDays: teacherStore.workDays,
			});
			notificationsStore.notify({
				success: true,
				title: "تم أضافة معلم جديد بنجاح!",
				description: `تم أضافة ${teacher.name} بنجاح.`,
			});
			router.push("/teachers");
		} catch {
			notificationsStore.notify({
				success: true,
				title: "تعذر أضافة معلم جديد!",
				description: `تعذر أضافة معلم جديد لسبب مجهول`,
			});
		}
	}

	if (teacherData.isLoading) {
		return <Loader></Loader>;
	}

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<Header>انشاء معلم جديد</Header>
					<P size="lg">هنا يمكنك انشاء معلم جديد</P>
				</div>

				<Link href={"/teachers"}>
					<Button
						size="lg"
						className="flex items-center gap-2 min-w-max self-end"
					>
						<ChevronLeftIcon className="h-5 w-5 stroke-white"></ChevronLeftIcon>
						<span>رجوع</span>
					</Button>
				</Link>
			</div>
			<div className=" grid gap-4">
				<div className="flex flex-col w-full gap-4 mt-8">
					<div className="space-y-4">
						<Header size="sm">معلومات المعلم</Header>
						<TextInput
							labelProps={{ className: "!font-bold mb-2" }}
							placeholder={"أكتب اسم المعلم"}
							label="أسم المعلم"
							className="w-fit"
							onChange={(e) =>
								useNewTeacherStore.setState({
									name: e.target.value,
								})
							}
							required
						></TextInput>
					</div>

					<div className="space-y-4 w-full">
						<Header size="sm">مواد المعلم</Header>
						<div className="gap-2 grid grid-flow-row [grid-template-columns:repeat(auto-fill,minmax(250px,1fr));] w-full">
							{teacherStore.subjects.map(
								({ id, inputId, name }) => {
									return (
										<ComboBox
											key={inputId}
											defaultValue={name}
											label={"اسم المادة"}
											required
											onItemSubmit={(item) => {
												const selectedSubject =
													allSubjects.data?.items.find(
														(subject) =>
															subject.name ===
															item.value,
													);
												console.log(
													item,
													selectedSubject,
												);
												if (selectedSubject)
													teacherStore.editSubject(
														inputId,
														selectedSubject,
													);
											}}
											onChange={(value) => {
												if (!value.trim()) {
													teacherStore.editSubject(
														inputId,
														{
															id: 1,
															name: "",
														},
													);
												}
											}}
											placeholder={"أكتب اسم المادة"}
											data={avalabileSubjects.map(
												(subject) => subject.name,
											)}
											nothingFound={
												<div className="flex gap-2 justify-center">
													<span>
														لا يوجد مواد اخرى
													</span>
													<Link href={"/subjects"}>
														<Button size="sm">
															أضف مواد
														</Button>
													</Link>
												</div>
											}
										></ComboBox>
									);
								},
							)}

							<Button
								type="button"
								size="md"
								className="min-w-max max-h-min mt-auto"
								onClick={() => teacherStore.addSubject()}
							>
								أضف مادة
							</Button>
						</div>
					</div>
				</div>

				<div className="space-y-4 w-full mt-8">
					<Header size="sm">توافر المعلم</Header>

					<Tabs defaultValue="SUNDAY">
						<Tabs.List className="w-fit">
							{DAYS_ARRAY.map(({ value, title }) => (
								<Tabs.Tab
									className=""
									key={value}
									value={value}
								>
									{title}
								</Tabs.Tab>
							))}
						</Tabs.List>

						{DAYS_ARRAY.map(({ value, title }) => {
							const dayData = teacherStore.workDays.find(
								(day) => day.day === value,
							)!;

							return (
								<Tabs.Panel
									className="space-y-4 mt-4"
									key={value + "panel"}
									value={value}
								>
									<div className="space-y-1">
										<Header size="sm">يوم {title}</Header>
										<P size="sm">
											هنا يمكن تحديد توافر المعلم فى يوم{" "}
											{title}
										</P>
										<P size="sm">
											فى حالة عدم تواجد المعلم فى هذه
											اليوم يرجى ترك الساعات فارغه
										</P>
									</div>
									{dayData.dates.map(
										({ endAt, inputId, startAt }) => {
											return (
												<div
													key={inputId}
													className="flex gap-2"
												>
													<TimePicker.RangePicker
														placeholder={[
															"من",
															"الى",
														]}
														format={format}
														onChange={(values) => {
															const startAt =
																values?.[0];
															const endAt =
																values?.[1];

															teacherStore.editWorkDayDate(
																value as DaysEnum,
																{
																	inputId,
																	startAt:
																		(startAt?.hour() ||
																			0) +
																		(startAt?.minute() ||
																			0) /
																			60,
																	endAt:
																		(endAt?.hour() ||
																			0) +
																		(endAt?.minute() ||
																			0) /
																			60,
																},
															);
														}}
													></TimePicker.RangePicker>

													{/* <NumberInput
													label={"متوفر من (ساعة)"}
													labelProps={{
														className:
															"!font-bold mb-2",
													}}
													key={inputId + "startAt"}
													min={0}
													defaultValue={startAt}
													onChange={(newStartAt) =>
														teacherStore.editWorkDayDate(
															value as DaysEnum,
															{
																inputId,
																startAt:
																	newStartAt!,
																endAt,
															},
														)
													}
												></NumberInput>
												<NumberInput
													label={"متوفر الى (ساعة)"}
													labelProps={{
														className:
															"!font-bold mb-2",
													}}
													key={inputId + "endAt"}
													min={0}
													defaultValue={endAt}
													onChange={(newEndAt) =>
														teacherStore.editWorkDayDate(
															value as DaysEnum,
															{
																inputId,
																startAt,
																endAt: newEndAt!,
															},
														)
													}
												></NumberInput> */}
												</div>
											);
										},
									)}
									<Button
										type="button"
										size="md"
										className="min-w-max max-h-min mt-auto"
										onClick={() =>
											teacherStore.addWorkDayDate(
												value as DaysEnum,
											)
										}
									>
										أضافة ساعة توفر اخرى
									</Button>
								</Tabs.Panel>
							);
						})}
					</Tabs>
				</div>
			</div>
			<div className="w-full border-t border-slate-400 pt-4 mt-4">
				<Button
					size="lg"
					className="w-full"
					onClick={() => {
						console.log(
							teacherStore.name,
							teacherStore.subjects,
							teacherStore.workDays,
						);
						teacherSubmit();
					}}
				>
					أضافة المعلم
				</Button>
			</div>
		</form>
	);
}

export default Index;
