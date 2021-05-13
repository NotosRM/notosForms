import React from "react";
import style from "./App.css";
import { FieldGroup } from "./Form/FieldGroup/FieldGroup";
import { FieldLayout } from "./Form/FieldLayout/FieldLayout";
import { FormLayout } from "./Form/FormLayout/FormLayout";

export const App = () => {
	const validate = (values: any) => {
		const errors: any = {};
		if (!values.firstName) {
			errors.firstName = "Required";
		}
		return errors;
	};

	return (
		<div className={style.main}>
			<FormLayout title="Customer registration" validate={validate} onSubmit={(...args) => console.log(args)}>
				<FieldGroup label="Personal information">
					<FieldLayout code="firstName" label="First name" />
					<FieldLayout code="lastName" label="Last name" />
					<FieldLayout code="gender" label="Gender" />
				</FieldGroup>
				<FieldGroup label="Contact information">
					<FieldLayout code="phone" label="Phone" />
					<FieldLayout code="email" label="Email" />
				</FieldGroup>
				<FieldGroup label="Interests">
					<FieldLayout code="favTVShow" label="Favorite TV Show" />
				</FieldGroup>
				<FieldLayout code="confirm" label="Subscribe to newsletter" />
			</FormLayout>
		</div>
	);
};
