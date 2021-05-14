import React, { ReactChild } from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import styles from "./FieldLayout.css";

type FieldLayoutProps = {
	code: string;
	label?: string;
	labelPosition?: "top" | "left" | "right";
	description?: string;
	placeholder?: string;
	control?: any;
	error?: string;
	required?: boolean;
	options?: any;
};
interface inputProps {
	placeholder?: string;
}
interface textAreaProps {
	control: "textArea";
	placeholder?: string;
}
interface selectProps {
	control: "select";
	options: any;
}

export const FieldLayout: React.FC<FieldLayoutProps> = (props) => {
	const Control = props.control || "input";
	const wrappperClassName = props.labelPosition
		? props.labelPosition == "top"
			? styles.wrapColumn
			: props.labelPosition == "right"
			? styles.wrapRowReverse
			: styles.wrapRow
		: styles.wrapRow;
	return (
		<Field
			name={props.code}
			render={({ input, meta }) => (
				<div className={wrappperClassName}>
					<label className={styles.label} htmlFor={props.code}>
						<span>{props.label}</span>
						{props.required == true && <sup className={styles.requiredMark}>*</sup>}
					</label>
					<div className={styles.component}>
						<div className={styles.controlWrap}>
							<Control
								className={meta.touched && meta.error ? styles.controlError : styles.control}
								{...input}
								placeholder={props?.placeholder}
							/>
						</div>
						{/* {props.description && <div className={styles.description}>{props.description}</div>} */}
						{meta.touched && meta.error && (
							<div className={styles.error}>
								<ul className={styles.errorDetail}>
									<li>{meta.error}</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			)}
		></Field>
	);
};

//TODO: Создать задачи на доработку
//TODO: порядок @apply в стилях
//TODO: Понакручивать стили
