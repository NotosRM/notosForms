import React from "react";
import { FormSpy } from "react-final-form";
import { FieldGroup } from "../components/Form/FieldGroup/FieldGroup";
import { FieldLayout } from "../components/Form/FieldLayout/FieldLayout";
import { FormLayout } from "../components/Form/FormLayout/FormLayout";
import style from "./App.css";

export const SimpleFormExample = () => {
	const validate = (values: any) => {
		const errors: any = {};
		if (!values.firstName) {
			errors.firstName = "validation failed";
		}
		return errors;
	};
	const genders = [
		{ value: "male", v: "male" },
		{ value: "female", v: "female" }
	];
	return (
		<div className={style.main}>
			<FormLayout title="Customer registration" validate={validate} onSubmit={(...args) => console.log(args)}>
				{/* <FieldGroup label="Personal information"> */}
				<FieldLayout
					code="themeChanger"
					label="Тема"
					control="select"
					elements={["", "dark", "pink", "coffee", "dark-blue", "light-blue", "modern-blue"]}
				></FieldLayout>
				<FormSpy
					subscription={{ values: true }}
					onChange={(props) => {
						document.documentElement.classList.value = props.values.themeChanger;
					}}
				/>
				<FieldLayout code="firstName" label="First name" description="Your full name" labelPosition="right" />
				<FieldLayout
					code="lastName"
					label="Last name"
					required={true}
					options={{ placeholder: "u last name" }}
					labelPosition="left"
				/>
				<FieldLayout code="gender" label="Gender" control="select" elements={genders} />
				{/* </FieldGroup> */}
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
