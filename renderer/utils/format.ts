import dayjs from "dayjs";
import "dayjs/locale/ar-sa";
dayjs.locale("ar-sa");

export function formatDuration(hours: number) {
	return dayjs()
		.startOf("day")
		.set("second", hours * 60 * 60)
		.format("hh:mm A")
		.replace(/[0-9]/g, (str) => Number(str).toLocaleString("ar-AE"));
}
