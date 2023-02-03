import { y } from "./y";

export const hallSchema = y.object().shape({
	name: y.string().required("يرجى أدخال أسم القاعة"),
	studentsCount: y.number().required("يرجى أدخال سعة القاعة من الطلاب"),
});
