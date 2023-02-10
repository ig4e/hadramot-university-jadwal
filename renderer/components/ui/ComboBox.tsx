import { Autocomplete, AutocompleteProps, ChevronIcon } from "@mantine/core";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

export interface ComboboxData {
	value: string;
	label: string;
	groupBy?: string;
}

function ComboBox({
	className,
	data,
	label,
	placeholder,
	onChange,
	value,
	...args
}: {
	data: ComboboxData[];
	className?: string;
	label?: string;
	placeholder?: string;
	onChange?: (value: ComboboxData | undefined) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
	const [selected, setSelected] = useState<ComboboxData>();
	const [query, setQuery] = useState("");

	useEffect(() => {
		onChange && onChange(selected);
	}, [selected]);

	const filteredData = useMemo(
		() =>
			query === ""
				? data
				: data.filter((element) => {
						return element.label?.toLowerCase?.()?.includes?.(query?.toLowerCase?.());
				  }),
		[query, data],
	);

	return (
		<div>
			{label && <label className="text-sm">{label}</label>}
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative">
					<div className="relative w-full cursor-default overflow-hidden rounded bg-white">
						<Combobox.Input
							{...args}
							className="w-full py-2 pr-3 pl-10 text-sm leading-5 rounded text-gray-900 focus:outline-none focus:ring-0  border border-gray-300  focus:border-blue-600"
							displayValue={(value: ComboboxData) => value.label}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={placeholder}
						/>
						<Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2 bg-transparent">
							<ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white p-1 text-base shadow-md ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm">
							{filteredData.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">لا يوجد نتائج.</div>
							) : (
								filteredData.map((value) => (
									<Combobox.Option
										key={value.value}
										className={({ active }) =>
											`relative rounded cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-blue-600 text-white" : "text-gray-900"
											}`
										}
										value={value}
									>
										{({ selected, active }) => (
											<>
												<span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
													{value.label}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-blue-600"
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}

export default ComboBox;
