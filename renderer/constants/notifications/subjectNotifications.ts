export const subjectCreateSuccessNotification = (subjectName: string) => ({
	title: "تم أضافة المادة بنجاح",
	description: "تم أضافة المادة <subjectName> بنجاح.".replaceAll("<subjectName>", subjectName),
	success: true,
});

export const subjectCreateFailNotification = (subjectName: string) => ({
	title: "تعذر أضافة المادة",
	description: "تعذر أضافة المادة <subjectName>.".replaceAll("<subjectName>", subjectName),
	success: false,
});

export const subjectEditSuccessNotification = (subjectName: string) => ({
	title: "تم تعديل المادة بنجاح",
	description: "تم تعديل المادة <subjectName> بنجاح.".replaceAll("<subjectName>", subjectName),
	success: true,
});

export const subjectEditFailNotification = (subjectName: string) => ({
	title: "تعذر تعديل المادة",
	description: "تعذر تعديل المادة <subjectName>.".replaceAll("<subjectName>", subjectName),
	success: false,
});
