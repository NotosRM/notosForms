import React from "react";
import { FormSpy } from "react-final-form";
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
		return errors;
	};
	const genders = ["male", "female"];
	return (
		<div className={style.main}>
			<FormLayout title="Customer registration" validate={validate} onSubmit={(...args) => console.log(args)}>
				<FieldGroup label="Personal information">
					<FieldLayout code="firstName" label="First name" description="Your full name" />
					<FieldLayout
						code="lastName"
						label="Last name"
						required={true}
						options={{ placeholder: "u last name" }}
					/>
					<FieldLayout code="gender" label="Gender" control="select" elements={genders} />
				</FieldGroup>
				<FieldGroup label="Contact information">
					<FieldLayout code="phone" label="Phone" labelPosition="top" />
					<FieldLayout code="email" label="Email" />
				</FieldGroup>
				<FieldGroup label="Interests">
					<FieldLayout code="favTVShow" label="Favorite TV Show" control="textarea" />
				</FieldGroup>
				<FieldLayout code="confirm" label="Subscribe to newsletter" control="radio" />
				<FieldLayout code="darkMode" label="Dark Mode" control="checkbox" />
				<FormSpy
					subscription={{ values: true }}
					onChange={(props) => {
						if (props.values.darkMode != null)
							document.documentElement.classList.toggle("dark", props.values.darkMode);
					}}
				/>
			</FormLayout>
		</div>
	);
};
