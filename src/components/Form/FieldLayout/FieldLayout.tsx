import React, { ReactChild } from "react";
import { Field, FieldRenderProps } from "react-final-form";
import styles from "./FieldLayout.css";

type FieldLayoutProps = {
	code: string;
	label?: string;
	labelPosition?: "top" | "left" | "right";
	description?: string;
	control?: any;
	error?: string;
	required?: boolean;
};

export const FieldLayout: React.FC<FieldLayoutProps> = (props) => {
	return (
		<Field
			name={props.code}
			render={({ input, meta }) => (
				<div className={styles.wrap}>
					<label className={styles.label} htmlFor={props.code}>
						<span>{props.label}</span>
					</label>
					<div className={styles.component}>
						<div className={styles.controlWrap}>
							<input className={styles.control} {...input} />
						</div>
						{props.description && <div className={styles.description}></div>}
						{meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
					</div>
				</div>
			)}
		></Field>
	);
};

//TODO: Создать задачи на доработку
//TODO: порядок @apply в стилях
//TODO: Понакручивать стили
