import { useRouter } from "next/router";
import { useMemo } from "react";
import { acceptTypeEnum, AcceptTypeEnumIndex } from "constants/enums/acceptTypeEnum";
import { semesterEnum, SemesterEnumIndex } from "constants/enums/semesterEnum";
import { trpc } from "utils/trpc";
import { levelEnum, LevelEnumIndex } from "constants/enums/levelEnum";
import { Divider } from "@mantine/core";
import Header from "components/ui/Header";
import P from "components/ui/P";
import Image from "next/image";
import { formatDuration } from "utils/format";
import { days, DaysIndex, localizeDays } from "components/teachers/TeacherForm";
import Button from "components/ui/Button";

import Logo from "public/images/logo.png";

const daysNumbers = {
	SUNDAY: 1,
	MONDAY: 2,
	TUESDAY: 3,
	WEDNESDAY: 4,
	THURSDAY: 5,
	FRIDAY: 6,
	SATURDAY: 7,
};

function Preview() {
	const router = useRouter();
	const { id } = router.query;
	const tableQuery = trpc.table.get.useQuery({ id: id as string });
	const { data } = tableQuery;

	const rowSpans = useMemo(() => {
		const rowSpans = new Map<DaysIndex, number>();
		if (!data) return rowSpans;

		days.forEach((day) => {
			rowSpans.set(day, data.subjects.filter((tSubject) => tSubject.day.name === day).length);
		});

		return rowSpans;
	}, [data]);

	if (!data) return <span>جارى التحميل</span>;
	const createdAtYear = new Date(data.createdAt).getFullYear();

	return (
		<div className="relative -mt-4 print:mt-0">
			<div className="fixed bottom-4 print:hidden bg-slate-900 rounded-xl transition p-2 ">
				<a href={"http://localhost:3000/generate/pdf?title=" + id}>
					<Button size="lg" icon="save">
						<span>استخراج ألى PDF</span>
					</Button>
				</a>
			</div>

			<div className="flex flex-col justify-between min-h-[99vh] h-full gap-4" id="preview">
				<div className="space-y-4 print:mt-2">
					<div className="flex">
						<div className="w-full self-center flex justify-start">
							<Header size="md" className="">
								الـجـمـهـوريـة الـيـمـنـيـة <br /> جــامـعـة حــضــرمـوت
							</Header>
						</div>
						<div className="min-w-fit">
							<Image src={Logo} className="w-32 lg:w-48" alt="logo" width={192} height={192} />
						</div>
						<div className="w-full self-center flex justify-start" dir={"ltr"}>
							<Header size="md" className="">
								REPUBLIC OF YEMEN <br /> HADRMOUT UNIVERSITY
							</Header>
						</div>
					</div>
					<div className="pb-0.5 border-b-2 border-t-2 border-blue-600 w-full" />
				</div>

				<div className="space-y-6">
					<div className="flex flex-col items-center gap-2">
						<Header size="lg">جدول المحاضرات الأسبوعى لقسم {data.major?.name}</Header>
						<div className="flex gap-4">
							<P size="lg">
								العام الدراسى: {createdAtYear}-{createdAtYear + 1}
							</P>
							<Divider orientation="vertical"></Divider>
							<P size="lg">الفصل الدراسى: {semesterEnum[data?.semester as unknown as SemesterEnumIndex]}</P>
							<Divider orientation="vertical"></Divider>
							<P size="lg"> القبول: ال{acceptTypeEnum[data?.type as unknown as AcceptTypeEnumIndex]}</P>
							<Divider orientation="vertical"></Divider>
							<P size="lg">المستوى: {levelEnum[data?.level as unknown as LevelEnumIndex]}</P>
						</div>
					</div>
					<table className="w-full " cellSpacing={108}>
						<tr className="border border-blue-600 text-center">
							<th className="border border-blue-600 text-center">الأيام</th>
							<th className="border border-blue-600 text-center">عضو هيئة التعليم</th>
							<th className="border border-blue-600 text-center">المادة</th>
							<th className="border border-blue-600 text-center">الوقت</th>
							<th className="border border-blue-600 text-center">القاعة</th>
						</tr>

						{data.subjects
							.sort((a, b) => daysNumbers[a.day.name as DaysIndex] - daysNumbers[b.day.name as DaysIndex])
							.map((subject, index, array) => {
								const subjectDay = subject.day.name as DaysIndex;
								return (
									<>
										<tr className={`${index % 2 ? "" : "bg-blue-200"}`}>
											{index === array.findIndex((subj) => subj.day.name === subject.day.name) && (
												<>
													<td
														className="border border-blue-600 text-center bg-slate-50"
														rowSpan={rowSpans.get(subject.day.name as DaysIndex)}
													>
														{localizeDays[subjectDay]}
													</td>
												</>
											)}
											<td className="border border-blue-600 text-center">{subject.teacher.name}</td>
											<td className="border border-blue-600 text-center">{subject.subject.name}</td>
											<td className="border border-blue-600 text-center">
												{formatDuration(subject.startsAt)}-{formatDuration(subject.endsAt)}
											</td>
											<td className="border border-blue-600 text-center">{subject.hall.name}</td>
										</tr>
									</>
								);
							})}
					</table>
				</div>

				<div className="mb-6 space-y-4">
					<div className="pb-0.5 border-b-2 border-t-2 border-blue-600 w-full" />
					<div className="flex justify-between">
						<div className="flex flex-col gap-1 items-start">
							<Header size="sm">المكلا-ص.ب: 50512-50511</Header>
							<Header size="sm">تليفاكس:(009675) 360766</Header>
						</div>
						<div className="flex flex-col gap-1 items-start" dir="ltr">
							<Header size="sm">Al-Mukalla P.O. Box: 50511-50512</Header>
							<Header size="sm">Tel Fax: 360766 (009675)</Header>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Preview;
