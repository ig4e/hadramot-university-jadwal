export const majorCreateSuccessNotification = (majorName: string) => ({
	title: "تم أضافة التخصص بنجاح",
	description: "تم أضافة التخصص <majorName> بنجاح.".replaceAll(
		"<majorName>",
		majorName,
	),
	success: true,
});

export const majorCreateFailNotification = (majorName: string) => ({
	title: "تعذر أضافة التخصص",
	description: "تعذر أضافة التخصص <majorName>.".replaceAll(
		"<majorName>",
		majorName,
	),
	success: false,
});

export const majorEditSuccessNotification = (majorName: string) => ({
	title: "تم تعديل التخصص بنجاح",
	description: "تم تعديل التخصص <majorName> بنجاح.".replaceAll(
		"<majorName>",
		majorName,
	),
	success: true,
});

export const majorEditFailNotification = (majorName: string) => ({
	title: "تعذر تعديل التخصص",
	description: "تعذر تعديل التخصص <majorName>.".replaceAll(
		"<majorName>",
		majorName,
	),
	success: false,
});
