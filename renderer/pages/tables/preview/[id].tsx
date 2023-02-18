import { useRouter } from "next/router";
import React from "react";
import { acceptTypeEnum, AcceptTypeEnumIndex } from "../../../constants/enums/acceptTypeEnum";
import { semesterEnum, SemesterEnumIndex } from "../../../constants/enums/semesterEnum";
import { trpc } from "../../../utils/trpc";
import { levelEnum, LevelEnumIndex } from "../../../constants/enums/levelEnum";
import { Divider } from "@mantine/core";
import Header from "../../../components/ui/Header";
import P from "../../../components/ui/P";

function Preview() {
	const router = useRouter();
	const { id } = router.query;
	const tableQuery = trpc.table.get.useQuery({ id: id as string });

	if (!tableQuery.data) return <span>جارى التحميل</span>;
	const { data } = tableQuery;

	return (
		<div>
			<div dir="ltr">Preview: {id}</div>

			<div className="flex flex-col items-center gap-2">
				<Header size="lg">جدول المحاضرات الأسبوعى لقسم {data.major?.name}</Header>
				<div className="flex gap-4">
					<P size="lg"> القبول ال{acceptTypeEnum[data?.type as unknown as AcceptTypeEnumIndex]}</P>
					<Divider orientation="vertical"></Divider>
					<P size="lg">الفصل الدراسى {semesterEnum[data?.semester as unknown as SemesterEnumIndex]}</P>
					<Divider orientation="vertical"></Divider>
					<P size="lg">المستوى {levelEnum[data?.level as unknown as LevelEnumIndex]}</P>
				</div>
			</div>

			<table></table>
		</div>
	);
}

export default Preview;
