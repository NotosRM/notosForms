import React from "react";
import { FieldLayoutProps } from "../FieldLayout";
import styles from "../FieldLayout.css";
import { IControl } from "./ControlsManager";

const Radio: IControl<RadioProps> = (props) => {
	let { code, label, input, className, ...rest } = props;
	let { checked, ...inputRP } = input;
	return (
		<div className={className}>
			<input
				{...inputRP}
				// checked={input.checked}
				className={styles.checkInput}
				id={code}
			/>
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
