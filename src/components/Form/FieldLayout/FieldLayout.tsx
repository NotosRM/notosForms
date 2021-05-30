import React from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import Controls, { ControlsProps } from "./ControlsLayout/ControlsManager";
import styles from "./FieldLayout.css";

export const FieldLayout: React.FC<FieldLayoutProps> = (props) => {
	let { fieldProps, ...rest } = props;
	const classNameByPosition =
		" " +
		(props.label && props.labelPosition
			? props.labelPosition == "left"
				? styles.lblPosLeft
				: props.labelPosition == "right"
				? styles.lblPosRight
				: styles.lblPosTop
			: styles.lblPosTop);
	const controlType = props.control || "input";
	const Control = Controls[controlType];
	return (
		<Field
			{...fieldProps}
			name={props.code}
			type={
				controlType == "checkbox" || controlType == "radio"
					? controlType
					: (props.fieldProps && props.fieldProps.type) || ""
			}
			render={({ input, meta }) => (
				<div className={styles.wrapper + classNameByPosition}>
					{controlType == "checkbox" || controlType == "radio" ? null : props.label ? (
						<label className={styles.label} htmlFor={props.code}>
							<span>{props.label}</span>
							{props.required == true && <sup className={styles.requiredMark}>*</sup>}
						</label>
					) : null}
					<div className={styles.component}>
						<div className={styles.container}>
							<Control
								className={
									styles.control +
									((meta.touched && meta.error && " " + styles.invalid) || "") +
									" " +
									styles[controlType]
								}
								input={input}
								{...rest}
								required={props.required}
							/>
						</div>

						{meta.touched && meta.error ? (
							<div className={styles.error}>{props.error || meta.error}</div>
						) : (
							props.description && <div className={styles.description}>{props.description}</div>
						)}
					</div>
				</div>
			)}
		></Field>
	);
};

export interface IFieldProps<
	FieldValue = any,
	RP extends FieldRenderProps<FieldValue, T> = FieldRenderProps<FieldValue, HTMLElement>,
	T extends HTMLElement = HTMLElement
> {
	code: string;
	label?: string;
	labelPosition?: "top" | "left" | "right";
	description?: string;
	error?: string;
	required?: boolean;
	fieldProps?: FieldProps<FieldValue, RP, T>;
	width?: number;
}
export type FieldLayoutProps = IFieldProps & ControlsProps;
