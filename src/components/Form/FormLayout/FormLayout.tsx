import React from "react";
import { Form, FormProps } from "react-final-form";
import styles from "./FormLayout.css";

export interface FormLayoutProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
	extends FormProps<FormValues, InitialFormValues> {
	title?: string;
	description?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = (props) => {
	let { title, children, description, ...rest } = props;

	return (
		<Form
			{...rest}
			render={({ handleSubmit }) => (
				<form className={styles.wrap} onSubmit={handleSubmit}>
					{title || description ? (
						<div className={styles.header}>
							{title ? <span className={styles.title}>{title}</span> : null}
							{description ? <span className={styles.description}>{description}</span> : null}
						</div>
					) : null}
					{children ? <div className={styles.content}>{children}</div> : null}
					<button className={styles.btn} type="submit">
						Submit
					</button>
				</form>
			)}
		></Form>
	);
};
