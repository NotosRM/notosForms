import React from "react";
import { FieldLayoutProps } from "../FieldLayout";

const Select: React.FC<FieldLayoutProps> = (props) => {
	let { required, className, input, options, elements } = props;

	return (
		<select {...input} className={className}>
			{elements?.map((element: any) => (
				<option key={props.key || element} value={element}>
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
