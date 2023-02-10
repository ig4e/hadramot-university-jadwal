import { clsx, RangeSlider, RangeSliderProps } from "@mantine/core";
import React, { useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/ar-sa";
dayjs.locale("ar-sa");

export function formatDuration(hours: number) {
	//${mStr.length > 2 ? mStr : mStr + "0"}
	return dayjs()
		.startOf("day")
		.set("second", hours * 60 * 60)
		.format("hh:mm A");
}

function TimeRangeSlider({ ...props }: RangeSliderProps) {
	const [value, setValue] = useState(props.value || [8, 16]);

	return (
		<div className={clsx(props.className, "flex items-center gap-2")}>
			<RangeSlider
				{...props}
				className={clsx(props.className, "w-full")}
				max={24}
				maxRange={24}
				minRange={0.25}
				labelAlwaysOn={true}
				label={formatDuration}
				step={0.25}
				marks={Array.from({ length: 24 * 2 }).map((_, index) => ({
					value: index / 2,
				}))}
				onChange={(value) => {
					props.onChange && props.onChange(value);
					setValue(value);
				}}
				value={value as any}
			></RangeSlider>
			<span className="w-[6rem] whitespace-nowrap">{value[1] - value[0]} ساعات</span>
		</div>
	);
}

export default TimeRangeSlider;
