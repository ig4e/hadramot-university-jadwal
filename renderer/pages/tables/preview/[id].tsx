import { useRouter } from "next/router";
import React from "react";
import { acceptTypeEnum, AcceptTypeEnumIndex } from "../../../constants/enums/acceptTypeEnum";
import { semesterEnum, SemesterEnumIndex } from "../../../constants/enums/semesterEnum";
import { trpc } from "../../../utils/trpc";
import { levelEnum, LevelEnumIndex } from "../../../constants/enums/levelEnum";
import { Divider } from "@mantine/core";
import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";
import Image from "next/image";

function Preview() {
	const router = useRouter();
	const { id } = router.query;
	const tableQuery = trpc.table.get.useQuery({ id: id as string });

	if (!tableQuery.data) return <span>جارى التحميل</span>;
	const { data } = tableQuery;
	const createdAtYear = new Date(data.createdAt).getFullYear();

	return (
		<div className="flex flex-col justify-between h-full">
			<div className="space-y-4">
				<div className="flex">
					<div className="w-full self-center">
						<Header size="md" className="w-1/2 text-center">الجمهورية اليمنية جامعة حضرموت</Header>
					</div>
					<div className="min-w-fit">
						<Image src={"/images/logo.png"} alt="logo" width={128 * 1.5} height={128 * 1.5} />
					</div>
					<div className="w-full self-center" dir={"ltr"}>
						<Header size="md" className="w-1/2 text-center">REPUBLIC OF YEMEN HADRMOUT UNIVERSITY</Header>
					</div>
				</div>
				<div className="pb-0.5 border-b-2 border-t-2 border-blue-600 w-full" />
			</div>

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
	);
}

export default Preview;
