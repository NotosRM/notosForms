import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import { IControl } from "./ControlsManager";

const Textarea: IControl<TextareaProps> = (props) => {
	let { required, className, input, options } = props;
	return <textarea {...input} className={className}></textarea>;
};

export interface TextareaProps {
	control: "textarea";
	options?: TextareasOptions;
	placeholder?: string;
}
interface TextareasOptions {
	resize?: "both" | "horizontal" | "vertical" | "none";
}
export default Textarea;
