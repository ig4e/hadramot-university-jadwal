import { y } from "./y";

export const tableDayValidationSchema = y.array().of(y.object().shape({
	id: y.string().required(),
	teacherId: y.string().required("يرجى أختيار معلم"),
	subjectId: y.string().required("يرجى أختيار المادة"),
	hallId: y.string().required("يرجى أختيار القاعة"),
	timeRange: y.array().of(y.number().required()).length(2),
}));

export const tableValidationSchema = y.object().shape({
	semester: y.number().required("يرجى أختيار الفصل الدارسى"),
	acceptType: y.number().required("يرجى أختيار نوع القبول"),
	majorId: y.string().required("يرجى أختيار التخصص"),
	level: y.number().required("يرجى أختيار المستوى"),
	SUNDAY: tableDayValidationSchema,
	MONDAY: tableDayValidationSchema,
	TUESDAY: tableDayValidationSchema,
	WEDNESDAY: tableDayValidationSchema,
	THURSDAY: tableDayValidationSchema,
	FRIDAY: tableDayValidationSchema,
	SATURDAY: tableDayValidationSchema,
});
