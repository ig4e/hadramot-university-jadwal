export const hallCreateSuccessNotification = (hallName: string) => ({
	title: "تم أضافة القاعة بنجاح",
	description: "تم أضافة القاعة <hallName> بنجاح.".replaceAll(
		"<hallName>",
		hallName,
	),
	success: true,
});

export const hallCreateFailNotification = (hallName: string) => ({
	title: "تعذر أضافة القاعة",
	description: "تعذر أضافة القاعة <hallName>.".replaceAll(
		"<hallName>",
		hallName,
	),
	success: false,
});

export const hallEditSuccessNotification = (hallName: string) => ({
	title: "تم تعديل القاعة بنجاح",
	description: "تم تعديل القاعة <hallName> بنجاح.".replaceAll(
		"<hallName>",
		hallName,
	),
	success: true,
});

export const hallEditFailNotification = (hallName: string) => ({
	title: "تعذر تعديل القاعة",
	description: "تعذر تعديل القاعة <hallName>.".replaceAll(
		"<hallName>",
		hallName,
	),
	success: false,
});
