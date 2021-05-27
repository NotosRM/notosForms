import React from "react";
import { IControl } from "./ControlsManager";

const Select: IControl<SelectProps> = (props) => {
	let { code, label, input, className, elements, options, ...rest } = props;
	return (
		<select {...input} className={className}>
			{options?.hasNullable ? <option key={null}></option> : null}
			{elements?.map((element: any) => {
				const value = element.value ? element.value : element;
				const v = element.v ? element.v : value;
				return (
					<option key={value} value={value}>
						{v}
					</option>
				);
			})}
		</select>
	);
};

export interface SelectProps {
	control: "select";
	elements?:
		| {
				value: string;
				v?: string;
		  }[]
		| string[];
	options?: SelectOptions;
}
interface SelectOptions {
	hasNullable?: boolean;
}

export default Select;
