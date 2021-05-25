import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import { IControl } from "./ControlsManager";

const Select: IControl<SelectProps> = (props) => {
	let { code, label, input, className, elements, options, ...rest } = props;
	return (
		<select {...input} className={className}>
			{options?.hasNullable ? <option key={null}></option> : null}
			{elements?.map((element: any) => (
				<option key={element.value} value={element.value}>
					{element.v == void 0 ? element.value : element.v}
				</option>
			))}
		</select>
	);
};

export interface SelectProps {
	control: "select";
	elements?: {
		value: string;
		v?: string;
	}[];
	options?: SelectOptions;
}
interface SelectOptions {
	hasNullable?: boolean;
}

export default Select;
