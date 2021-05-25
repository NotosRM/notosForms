import React from "react";
import { Form, FormProps } from "react-final-form";
import styles from "./FormLayout.css";

interface FormLayoutProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
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
					{title ? (
						<div className={styles.header}>
							<span>{title}</span>
						</div>
					) : null}
					{description ? (
						<div className={styles.description}>
							<span>{description}</span>
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
