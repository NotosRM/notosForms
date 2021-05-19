import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import { IControl } from "./ControlsManager";

const Select: IControl<SelectProps> = (props) => {
	let { code, label, input, className, elements, ...rest } = props;
	return (
		<select {...input} className={className}>
			{elements?.map((element: any) => (
				<option key={element} value={element}>
					{element}
				</option>
			))}
		</select>
	);
};

export interface SelectProps {
	control: "select";
	elements?: any;
	options?: SelectOptions;
	placeholder?: string;
}
interface SelectOptions {}

export default Select;
