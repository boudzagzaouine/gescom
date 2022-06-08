import classNames from 'classnames';
import { forwardRef, memo } from 'react';
import { StringUtils } from 'utils/StringUtils';
import { Form } from 'widgets/Form';
import { View } from 'widgets/View';

import type { InputProps, PolymorphicRef } from "widgets/types";
export const Input = memo(
	forwardRef(
		<C extends React.ElementType = "input">(
			{
				label,
				meta,
				prepend,
				append,
				row,
				inputClass = "",
				labelClass = "",
				...props
			}: InputProps<C>,
			ref?: PolymorphicRef<C>,
		) => {
			const { as: asComponent = "input", type } = props;
			const id = props.id || StringUtils.uniqueId();
			const className = props.className || "";
			const isInput = asComponent === "input";
			const isTextArea = asComponent === "textarea";
			const isSelect = asComponent === "select";
			let isCheckbox = false;
			let isRadio = false;
			if (isInput) {
				if (type === "radio") {
					isRadio = true;
				} else if (type === "checkbox") {
					isCheckbox = true;
				}
			}
			// console.log('render input ? ', label);
			const inputClassName = classNames(
				{ "min-w-40": isSelect },
				`border outline-[#707070]/80  text-[#000000] float-left rounded border-[#707070]/30 outline:border-[#f00] disabled:bg-[#ddd]/30 disabled:text-[#999]`,
				!isRadio && !isCheckbox && `w-full`,
				{
					"py-3": isTextArea,
					"py-1": isInput || isSelect,
					"my-2 mx-8": isRadio || isCheckbox,
					"bg-[#ddf]/30": isSelect,
				},
				// isRadio || isCheckbox
				//   ? "rounded h-4 w-4"
				//   : "block w-full sm:text-sm shadow-sm",
				// { "border-red-400": meta?.invalid },
				// prepend && !(isRadio || isCheckbox) ? "rounded-r-md" : "rounded-md",
				inputClass,
			);
			const labelClassName = classNames(
				`w-full block font-medium  text-[#272727] sm:mt-px sm:pt-1 sm:pl-8 capitalize   float-left`,
				{ "ml-2 ": isRadio || isCheckbox },
				labelClass,
			);
			const containerClassName = classNames(
				" sm:gap-1 sm:grid sm:grid-cols-3 sm:items-start sm:pt-1 pl-2 w-full   ",
				className,
			);
			//sm:grid sm:grid-cols-3
			const inputWrapperClassName = classNames(
				" disabled:border disabled:border-pink-300 mt-1 sm:mt-0 sm:col-span-2",
				{
					"items-center ": isRadio || isCheckbox,
				},
			);

			const labelUi = label ? (
				<Form.Label htmlFor={id} className={labelClassName}>
					{label}
				</Form.Label>
			) : null;
			return (
				<View row={row} className={containerClassName}>
					{!(isCheckbox || isRadio) && labelUi}
					<View className={inputWrapperClassName}>
						{prepend}
						<Form.Control
							id={id}
							ref={ref}
							type='text'
							{...props}
							className={inputClassName}
						/>
						{(isCheckbox || isRadio) && labelUi}
						{append}
					</View>
					<Form.Error meta={meta} />
				</View>
			);
		},
	),
);
