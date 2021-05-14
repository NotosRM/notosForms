import React from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import styles from "./FieldLayout.css";

type IFieldProps = FieldLayoutProps & (InputProps | TextareaProps | SelectProps | CheckboxProps | RadioProps);
interface FieldLayoutProps<
	FieldValue = any,
	RP extends FieldRenderProps<FieldValue, T> = FieldRenderProps<FieldValue, HTMLElement>,
	T extends HTMLElement = HTMLElement
> extends FieldProps<FieldValue, RP, T> {
	code: string;
	label?: string;
	labelPosition?: "top" | "left" | "right";
	description?: string;
	error?: string;
	required?: boolean;
	htmlAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}
interface InputProps extends IPromptContainer {
	control?: "input";
}
interface TextareaProps extends IPromptContainer {
	control: "textarea";
}
interface SelectProps extends IPromptContainer {
	control: "select";
	options: any;
}
interface CheckboxProps extends ICheckedContainer {
	control: "checkbox";
	isTthreeState?: boolean;
}
interface RadioProps extends ICheckedContainer {
	control: "radio";
}
interface ICheckedContainer {
	checked?: boolean;
}
interface IPromptContainer {
	placeholder?: string;
}
interface Field<
	FieldValue = any,
	RP extends FieldRenderProps<FieldValue, T> = FieldRenderProps<FieldValue, HTMLElement>,
	T extends HTMLElement = HTMLElement
> {
	props: FieldProps<FieldValue, RP, T>;
}
const Input: React.FC<IFieldProps> = (props) => {
	let { className, input, meta } = props;
	return <input className={className} />;
};

const TextArea: React.FC<IFieldProps> = (props) => {
	let { className, input, meta } = props;
	return <textarea className={className} name="" id=""></textarea>;
};

const Select: React.FC<IFieldProps> = (props) => {
	let { className, input, meta, options } = props;
	return (
		<select className={className}>
			{options.map((element: any) => (
				<option key={props.key || element} value={element}>
					{element}
				</option>
			))}
		</select>
	);
};

const CheckBox: React.FC<IFieldProps> = (props) => {
	let { className, input, meta } = props;
	return <input type="checkbox" className={className} name="" id="" />;
};

const Radio: React.FC<IFieldProps> = (props) => {
	let { className, input, meta } = props;
	return <input type="radio" className={className} name="" id="" />;
};

export const FieldLayout: React.FC<IFieldProps> = (props) => {
	let { rest } = props;
	const wrappperClassName = props.labelPosition
		? props.labelPosition == "top"
			? styles.wrapColumn
			: props.labelPosition == "right"
			? styles.wrapRowReverse
			: styles.wrapRow
		: styles.wrapRow;
	const Controls: { [control: string]: any } = {
		input: Input,
		textarea: TextArea,
		select: Select,
		checkbox: CheckBox,
		radio: Radio
	};
	const Control = Controls[props.control || "input"];
	return (
		<Field
			{...rest}
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
								{...meta}
								{...props}
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
//TODO: порядок @apply в стилях
//TODO: Понакручивать стили
