import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import { IControl } from "./ControlsManager";

const Textarea: IControl<TextareaProps> = (props) => {
	let { required, className, input, options } = props;
	return (
		<textarea {...input} className={className} placeholder={options?.placeholder} required={required}></textarea>
	);
};

export interface TextareaProps {
	control: "textarea";
	options?: TextareasOptions;
}
interface TextareasOptions {
	placeholder: string;
}
export default Textarea;
