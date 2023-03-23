import { y } from "./y";

export const majorSchema = y.object().shape({
	name: y.string().required("يرجى أدخال أسم التخصص"),
	studentsCount: y.number().required("يرجى أدخال عدد طلاب التخصص"),
	type: y.number().required("يرجى أدخال أسم التخصص"),
});
