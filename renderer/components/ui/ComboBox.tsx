import { Autocomplete, AutocompleteProps, ChevronIcon } from "@mantine/core";
import { ChevronDownIcon } from "@radix-ui/react-icons";
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
			icon={<ChevronDownIcon className="pointer-events-none"></ChevronDownIcon>}
		/>
	);
}

export default ComboBox;
