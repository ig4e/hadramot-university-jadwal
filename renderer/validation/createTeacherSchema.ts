import * as y from "yup";
import { ar } from "yup-locales";
y.setLocale(ar);

export const createTeacherValidationSchema = y
	.object()
	.shape({
		name: y.string().required("يرجى ادخال أسم"),
		subjects: y.array().of(y.string().required()),
	});
