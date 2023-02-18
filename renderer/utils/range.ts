export type Range = [number, number];

export const isBetween = (number: number, range: Range) => {
	const [min, max] = range;
	return number >= min && number <= max;
};

export const isIn = (range: Range, ranges: Range[]) => {
	const [startsAt, endsAt] = range;
	return ranges.some(([rangeStartsAt, rangeEndsAt]) => startsAt >= rangeStartsAt && endsAt <= rangeEndsAt);
};

export const isConflicting = (range: Range, ranges: Range[]) => {
	if (ranges.length === 0) return false;
	const [startsAt, endsAt] = range;
	return ranges.some((timeRange) => {
		if (isBetween(startsAt, timeRange)) return true;
		if (isBetween(endsAt, timeRange)) return true;
		if (isBetween(timeRange[0], range)) return true;
		if (isBetween(timeRange[1], range)) return true;
		return false;
	});
};
