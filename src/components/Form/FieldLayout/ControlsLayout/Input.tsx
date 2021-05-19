import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import { IControl } from "./ControlsManager";

const Input: IControl<InputProps> = (props) => {
	let { required, input, className } = props;
	return <input {...input} className={className} required={required} />;
};
export interface InputProps {
	control?: "input";
	options?: InputOptions;
}
interface InputOptions {
	placeholder?: string;
}
export default Input;
