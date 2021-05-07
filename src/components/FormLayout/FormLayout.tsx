import React from "react";
import { Field, Form } from "react-final-form";
import { FieldLayout } from "../FieldLayout/FieldLayout";
import styles from "./FormLayout.css";

interface FormLayoutProps {
	title?: string;
	description?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = (props) => {
	return (
		<Form
			onSubmit={(...args) => console.log(args)}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div className={styles.header}>{props.title}</div>
					<div className={styles.content}>
						<FieldLayout
							code="FieldCode"
							label="Введите значение:"
							control="input"
							labelPosition="top"
						></FieldLayout>
						{/* <FieldGroupLayout

						></FieldGroupLayout> */}
					</div>
					<button type="submit">Submit</button>
				</form>
			)}
		></Form>
	);
};
