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
			errors.testField = "this field is empty";
		}
		return errors;
	};
	const genders = ["male", "female"];
	return (
		<div className={style.main}>
			<FormLayout title="Customer registration" validate={validate} onSubmit={(...args) => console.log(args)}>
				<FieldGroup label="Personal information">
					<FieldLayout code="firstName" name="" label="First name" description="Your full name" />
					<FieldLayout code="lastName" name="" label="Last name" required={true} />
					<FieldLayout code="gender" name="" label="Gender" control="select" elements={genders} />
				</FieldGroup>
				<FieldGroup label="Contact information">
					<FieldLayout code="phone" name="" label="Phone" labelPosition="top" />
					<FieldLayout code="email" name="" label="Email" type="email" />
				</FieldGroup>
				<FieldGroup label="Interests">
					<FieldLayout code="favTVShow" name="" label="Favorite TV Show" control="textarea" />
				</FieldGroup>
				<FieldLayout code="confirm" name="" label="Subscribe to newsletter" control="radio" />
			</FormLayout>
		</div>
	);
};
