import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import { IControl } from "./ControlsManager";

const Input: IControl<InputProps> = (props) => {
	let { input, className, required, options } = props;
	return <input {...input} className={className} placeholder={options?.placeholder} required={required} />;
};
export interface InputProps {
	control?: "input";
	options?: InputOptions;
}
interface InputOptions {
	placeholder?: string;
}
export default Input;
