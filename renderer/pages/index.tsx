import { PlusIcon } from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { Autocomplete, ChevronIcon, Loader } from "@mantine/core";
import ComboBox from "../components/ui/ComboBox";
import PageHeader from "../components/PageHeader";

function Index() {
	return (
		<div className="space-y-4">
			<PageHeader
				header="الجداول"
				description="هنا يوجد جميع الجداول"
			></PageHeader>

			<div className="flex gap-4 items-center">
				<ComboBox
					label="أختر نوع القبول"
					placeholder="نوع القبول"
					data={["عام", "ثانوى"]}
				/>
				<ComboBox
					label="أختر الفصل الدراسى"
					placeholder="الفصل الدراسى"
					data={["الأول", "الثانى"]}
				/>
				<ComboBox
					label="أختر المستوى"
					placeholder="المستوى"
					data={["الأول", "الثانى", "الثالث", "الرابع"]}
				/>
				<ComboBox
					label="أختر التخصص"
					placeholder="التخصص"
					data={["ادارة معلومات"]}
				/>
				<Button
					size="md"
					className="flex items-center gap-2 min-w-max self-end"
				>
					<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
					<span>أنشئ جدول جديد</span>
				</Button>
			</div>
		</div>
	);
}

export default Index;
