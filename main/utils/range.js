"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConflicting = exports.isIn = exports.isBetween = void 0;
const isBetween = (number, range) => {
    const [min, max] = range;
    return number > min && number < max;
};
exports.isBetween = isBetween;
const isIn = (range, ranges = []) => {
    const [startsAt, endsAt] = range;
    return ranges.some(([rangeStartsAt, rangeEndsAt]) => startsAt >= rangeStartsAt && endsAt <= rangeEndsAt);
};
exports.isIn = isIn;
const isConflicting = (range, ranges = []) => {
    if (ranges.length === 0)
        return false;
    const [startsAt, endsAt] = range;
    return ranges.some((timeRange) => {
        if (startsAt === timeRange[0] && endsAt === timeRange[1])
            return true;
        if ((0, exports.isBetween)(startsAt, timeRange))
            return true;
        if ((0, exports.isBetween)(endsAt, timeRange))
            return true;
        if ((0, exports.isBetween)(timeRange[0], range))
            return true;
        if ((0, exports.isBetween)(timeRange[1], range))
            return true;
        return false;
    });
};
exports.isConflicting = isConflicting;
