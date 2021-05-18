import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import styles from "../FieldLayout.css";

const Radio: React.FC<FieldLayoutProps> = (props) => {
	let { required, className, input, options, label, code } = props;
	return (
		<div className={className}>
			<input {...input} type="radio" className={styles.checkInput} name={code} id="" />
			{label && (
				<label htmlFor={code} className={styles.checkLabel}>
					{label}
				</label>
			)}
		</div>
	);
};

export interface RadioProps {
	control: "radio";
	options?: RadioOptions;
}
interface RadioOptions {
	checked: boolean;
}
export default Radio;
