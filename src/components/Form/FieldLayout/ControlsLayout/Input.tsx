import React from "react";
import { FieldLayoutProps } from "../FieldLayout";

const Input: React.FC<FieldLayoutProps> = (props) => {
	let { required, className, input } = props;
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
