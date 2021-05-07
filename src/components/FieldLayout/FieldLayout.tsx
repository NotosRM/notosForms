import React, { ReactChild } from "react";
import { Field, FieldRenderProps } from "react-final-form";
import styles from "./FieldLayout.css";

type FieldLayoutProps = {
	code: string;
	label?: string;
	labelPosition?: "top" | "left" | "right";
	description?: string;
	control: any;
	error?: string;
	required?: boolean;
};

export const FieldLayout: React.FC<FieldLayoutProps> = (props) => {
	return (
		<Field
			name={props.code}
			render={() => (
				<div className={styles.component}>
					{props.label ? (
						props.labelPosition == "top" ? (
							<label htmlFor={props.code}>
								<span>{props.label}</span>
								{/* Добавить контрол*/}
							</label>
						) : props.labelPosition == "right" ? (
							<React.Fragment>
								{/* Добавить контрол*/}
								<label htmlFor={props.code}>
									<span>{props.label}</span>
								</label>
							</React.Fragment>
						) : (
							<React.Fragment>
								<label htmlFor={props.code}>
									<span>{props.label}</span>
								</label>
								{/* Добавить контрол*/}
							</React.Fragment>
						)
					) : (
						{
							/* Добавить контрол*/
						}
					)}
					{props.description && (
						<div className={styles.description}></div>
					)}
					{props.error && <div className={styles.error}></div>}
				</div>
			)}
		></Field>
	);
};
