import { Select, SelectItem } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { formatDuration } from "utils/format";

function TimeRangeSelect({
	value,
	onChange,
	error,
	disabled = false,
}: {
	value?: [number, number];
	onChange?: (value: [number, number]) => void;
	error?: string;
	disabled: boolean;
}) {
	const [state, setState] = useState<[number, number]>();
	const hours: SelectItem[] = useMemo(() => {
		return [
			...Array.from({
				length: 24 * 2,
			}).map((_, index) => {
				return {
					value: (index + 1) / 2,
					label: formatDuration((index + 1) / 2),
				};
			}),
		] as any;
	}, []);

	// useEffect(() => {
	// 	if (state?.length === 2) onChange && onChange(state!);
	// }, [state]);

	useEffect(() => {
		setState(value);
	}, [value]);

	//onChange;

	function handleChange(index: number) {
		return function handleOnChange(value: string) {
			setState((state) => {
				if (state) state[index] = Number(value);
				return state;
			});
		};
	}

	return (
		<div className="flex gap-2 w-56">
			<Select
				placeholder="من"
				data={[...hours]}
				onChange={handleChange(0)}
				value={state && String(state[0])}
				error={error}
				disabled={disabled}
			></Select>
			<Select
				placeholder="ألى"
				data={[...hours]}
				onChange={handleChange(1)}
				value={state && String(state[1])}
				error={error}
				disabled={disabled}
			></Select>
		</div>
	);
}

export default TimeRangeSelect;
