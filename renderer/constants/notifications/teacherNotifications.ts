export const teacherCreateSuccessNotification = (teacherName: string) => ({
	title: "تم أضافة المعلم بنجاح",
	description: "تم أضافة المعلم <teacherName> بنجاح.".replaceAll(
		"<teacherName>",
		teacherName,
	),
	success: true,
});

export const teacherCreateFailNotification = (teacherName: string) => ({
	title: "تعذر أضافة المعلم",
	description: "تعذر أضافة المعلم <teacherName>.".replaceAll(
		"<teacherName>",
		teacherName,
	),
	success: false,
});

export const teacherEditSuccessNotification = (teacherName: string) => ({
	title: "تم تعديل المعلم بنجاح",
	description: "تم تعديل المعلم <teacherName> بنجاح.".replaceAll(
		"<teacherName>",
		teacherName,
	),
	success: true,
});

export const teacherEditFailNotification = (teacherName: string) => ({
	title: "تعذر تعديل المعلم",
	description: "تعذر تعديل المعلم <teacherName>.".replaceAll(
		"<teacherName>",
		teacherName,
	),
	success: false,
});
