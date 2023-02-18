import { clsx, RangeSlider, RangeSliderProps } from "@mantine/core";
import React, { useState } from "react";
import { formatDuration } from "../../utils/format";

import { motion, AnimatePresence } from "framer-motion";

function TimeRangeSlider({ error, ...props }: RangeSliderProps & { error?: string }) {
	const [value, setValue] = useState(props.value || [8, 16]);

	return (
		<div className={clsx(props.className, "")}>
			<RangeSlider
				{...props}
				className={clsx(props.className, "w-full")}
				max={24}
				maxRange={24}
				minRange={0.25}
				// labelAlwaysOn={true}
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
				color={error && "red"}
			></RangeSlider>

			<div className={clsx("relative", { "text-red-500": !!error })}>
				<AnimatePresence>
					{error && (
						<motion.div
							key="sliderError"
							className="ml-36"
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							transition={{ duration: 0.1 }}
						>
							<span dangerouslySetInnerHTML={{ __html: error }}></span>
						</motion.div>
					)}
				</AnimatePresence>

				<span className="whitespace-nowrap self-start top-0 left-0 absolute">
					{formatDuration(value[0])} ألى {formatDuration(value[1])}
				</span>
				<div className="h-4 w-1 block"></div>
			</div>
		</div>
	);
}

export default TimeRangeSlider;
