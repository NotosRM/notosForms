import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import styles from "../FieldLayout.css";

const Checkbox: React.FC<FieldLayoutProps> = (props) => {
	let { required, className, input, options, code, label } = props;
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
	isTthreeState?: boolean;
}
export default Checkbox;
