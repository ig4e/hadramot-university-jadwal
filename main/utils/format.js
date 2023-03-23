"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/ar-sa");
dayjs_1.default.locale("ar-sa");
function formatDuration(hours) {
    return (0, dayjs_1.default)()
        .startOf("day")
        .set("second", hours * 60 * 60)
        .format("hh:mm A")
        .replace(/[0-9]/g, (str) => Number(str).toLocaleString("ar-AE"));
}
exports.formatDuration = formatDuration;
