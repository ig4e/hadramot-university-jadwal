import React, { useEffect, useState } from "react";
import TimeRangeSlider from "components/ui/TimeRangeSlider";
import { isConflicting } from "utils/range";

function Test() {
	const [sliderOne, setSliderOne] = useState<[number, number]>([0, 12]);
	const [sliderTwo, setSliderTwo] = useState<[number, number]>([12, 16]);
	const [sliderThree, setSliderThree] = useState<[number, number]>([16, 20]);

	const [sliderErrors, setSliderErrors] = useState({ sliderOne: "", sliderTwo: "", sliderThree: "" });

	useEffect(() => {
		const isSliderOneConflicting = isConflicting(sliderOne, [sliderTwo, sliderThree]);
		const isSliderTwoConflicting = isConflicting(sliderTwo, [sliderOne, sliderThree]);
		const isSliderThreeConflicting = isConflicting(sliderThree, [sliderOne, sliderTwo]);

		const allConflicts = {
			sliderOne: isSliderOneConflicting ? "c" : "",
			sliderTwo: isSliderTwoConflicting ? "c" : "",
			sliderThree: isSliderThreeConflicting ? "c" : "",
		};

		setSliderErrors(allConflicts);
	}, [sliderOne, sliderTwo, sliderThree]);

	return (
		<div className="mt-52 space-y-10">
			<TimeRangeSlider value={sliderOne} onChange={(value) => setSliderOne(value)} error={sliderErrors.sliderOne}></TimeRangeSlider>
			<TimeRangeSlider value={sliderTwo} onChange={(value) => setSliderTwo(value)} error={sliderErrors.sliderTwo}></TimeRangeSlider>
			<TimeRangeSlider
				value={sliderThree}
				onChange={(value) => setSliderThree(value)}
				error={sliderErrors.sliderThree}
			></TimeRangeSlider>
		</div>
	);
}

export default Test;
