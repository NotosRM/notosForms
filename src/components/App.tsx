import React from "react";
import style from "./App.css";
import { FieldGroup } from "./Form/FieldGroup/FieldGroup";
import { FieldLayout } from "./Form/FieldLayout/FieldLayout";
import { FormLayout } from "./Form/FormLayout/FormLayout";

export const App = () => {
	const validate = (values: any) => {
		const errors: any = {};
		if (!values.firstName) {
			errors.firstName = "validation failed";
		}
		if (!values.testField) {
			errors.testField = "this field can't be empty";
		}
		return errors;
	};
	const genders = {
		m: "male",
		w: "female"
	};
	return (
		<div className={style.main}>
			<FormLayout title="Customer registration" validate={validate} onSubmit={(...args) => console.log(args)}>
				<FieldGroup label="Personal information">
					<FieldLayout code="firstName" label="First name" description="Your full name" />
					<FieldLayout code="lastName" label="Last name" required={true} />
					<FieldLayout code="gender" label="Gender" control="Select" options={genders} />
				</FieldGroup>
				<FieldGroup label="Contact information">
					<FieldLayout code="phone" label="Phone" />
					<FieldLayout code="email" label="Email" control="select" />
				</FieldGroup>
				<FieldLayout code="testField" label="testLabel" control="textArea" />
				<FieldGroup label="Interests">
					<FieldLayout code="favTVShow" label="Favorite TV Show" labelPosition="right" />
				</FieldGroup>
				<FieldLayout code="confirm" label="Subscribe to newsletter" />
			</FormLayout>
		</div>
	);
};
