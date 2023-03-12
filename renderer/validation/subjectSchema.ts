import { y } from "./y";

export const subjectSchema = y.object().shape({
	name: y.string().required("يرجى أدخال أسم المادة"),
});
