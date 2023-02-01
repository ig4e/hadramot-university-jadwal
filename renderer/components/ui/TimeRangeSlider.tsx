import { RangeSlider, RangeSliderProps } from "@mantine/core";
import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/ar-sa";
dayjs.locale("ar-sa");

function formatDuration(hours: number) {
	//${mStr.length > 2 ? mStr : mStr + "0"}
	return dayjs()
		.startOf("day")
		.set("second", hours * 60 * 60)
		.format("hh:mm A");
}

function TimeRangeSlider({ ...props }: RangeSliderProps) {
	return (
		<RangeSlider
			{...props}
			max={24}
			maxRange={24}
			minRange={0.25}
			labelAlwaysOn={true}
			label={formatDuration}
			step={0.25}
			marks={Array.from({ length: 24 * 4 }).map((_, index) => ({
				value: index / 4,
			}))}
		></RangeSlider>
	);
}

export default TimeRangeSlider;
