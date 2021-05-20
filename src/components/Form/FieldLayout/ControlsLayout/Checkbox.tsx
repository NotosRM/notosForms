import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import styles from "../FieldLayout.css";
import { IControl } from "./ControlsManager";

const Checkbox: IControl<CheckboxProps> = (props) => {
	let { code, label, input, className, ...rest } = props;
	return (
		<div className={className}>
			<input {...input} type="checkbox" className={styles.checkInput} id={code} />
			{label && (
				<label htmlFor={code} className={styles.checkLabel}>
					{label}
				</label>
			)}
		</div>
	);
};
export interface CheckboxProps {
	control: "checkbox";
	options?: CheckboxOptions;
	checked?: boolean;
}

interface CheckboxOptions {
	inderterminate?: boolean;
}
export default Checkbox;
