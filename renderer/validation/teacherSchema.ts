import { y } from "./y";

export const teacherValidationSchema = y.object().shape({
	name: y.string().required("يرجى ادخال أسم"),
	subjects: y.array().of(y.string().required("يرجى أدخال مادة واحدة على الاقل")),
});
