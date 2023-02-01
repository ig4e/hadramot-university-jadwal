import { RangeSlider } from "@mantine/core";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import Button from "../ui/Button";
import TimeRangeSlider from "../ui/TimeRangeSlider";

function CreateTeacherDate({
	control,
	fieldKey,
}: {
	control: any;
	fieldKey: string;
}) {
	const { fields, append, prepend, remove, swap, move, insert } =
		useFieldArray({
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: `workDates.${fieldKey}`, // unique name for your Field Array
		});

	return (
		<div className="space-y-2">
			<div className="space-y-10">
				{fields.map((field, index) => {
					return (
						<div>
							<Controller
								key={field.id}
								name={`workDates.${fieldKey}.${index}.value`}
								control={control}
								render={({ field }) => {
									return (
										<div className="flex items-center gap-2">
											<TimeRangeSlider
												{...field}
                                                className="w-full"
											></TimeRangeSlider>
											<Button
												type="button"
												intent="danger"
												size="sm"
												onClick={() => {
													remove(index);
												}}
											>
												حذف
											</Button>
										</div>
									);
								}}
							/>
						</div>
					);
				})}
			</div>

			<Button
				type="button"
				size="md"
				onClick={() => {
					append({ value: [16, 20] });
				}}
			>
				أضافة ساعة توفر
			</Button>
		</div>
	);
}

export default CreateTeacherDate;
