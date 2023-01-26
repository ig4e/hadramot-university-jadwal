import { Autocomplete, AutocompleteProps, ChevronIcon } from "@mantine/core";
import clsx from "clsx";
import React from "react";

function ComboBox({
	className,
	...autoCompleteArgs
}: AutocompleteProps & React.RefAttributes<HTMLInputElement>) {
	return (
		<Autocomplete
			{...autoCompleteArgs}
			dir="rtl"
			className={clsx("w-full", className)}
			labelProps={{ className: "!font-bold mb-2" }}
			rightSection={<ChevronIcon></ChevronIcon>}
		/>
	);
}

export default ComboBox;
