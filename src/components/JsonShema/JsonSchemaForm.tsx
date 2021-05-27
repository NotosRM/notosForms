import { JSONSchema4, JSONSchema4TypeName, validate, ValidationError } from "json-schema";
import React from "react";
import { FieldGroup } from "../Form/FieldGroup/FieldGroup";
import { FieldLayout, FieldLayoutProps } from "../Form/FieldLayout/FieldLayout";
import { FormLayout, FormLayoutProps } from "../Form/FormLayout/FormLayout";

interface JsonSchemaFormProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
	extends FormLayoutProps<FormValues, InitialFormValues> {
	schema: JSONSchema4;
}

export const JsonSchemaForm: React.FC<JsonSchemaFormProps> = (props) => {
	let { schema, ...formProps } = props;
	const path = "#";
	const schemaValidation = (values: any) => {
		let errors: any = {};
		let v = validate(values, schema);

		v.errors.map((e: ValidationError) => {
			let errorObject = {};
			let path = e.property.split(".").reverse();
			path.forEach((key, index) => {
				if (index == path.length - 1) {
					if (index == 0) Object.defineProperty(errors, `${key}`, { value: e.message });
					else Object.defineProperty(errors, `${key}`, { value: errorObject });
					return;
				}
				if (index == 0) {
					Object.defineProperty(errorObject, `${key}`, { value: e.message });
					return;
				}
				errorObject = Object.defineProperty({}, `${key}`, { value: errorObject });
			});
		});

		return errors;
	};
	const goToSchema = (s: JSONSchema4, path: string) => {
		return path
			.slice(2)
			.split("/")
			.reduce(function (obj, key) {
				return obj[key];
			}, s);
	};
	const makeCode = (path: string) => {
		return path
			.slice(2)
			.split("/")
			.filter((value) => value != "properties")
			.join(".");
	};
	let createAnyOf = (schema: JSONSchema4, path: string) => {
		path = `${path}/anyOf`;
		let schemas = goToSchema(schema, path);

		return <React.Fragment></React.Fragment>;
	};
	let createLayout = (schema: JSONSchema4, path: string = "") => {
		let currentSchema: JSONSchema4 = goToSchema(schema, path);
		let { type, enum: t, anyOf, ...rest } = currentSchema;

		return Object.keys(currentSchema || []).map((key) => {
			const component = currentSchema[key];
			let { type, title, description, options, enum: t, anyOf, required, ...rest } = component;
			let r = required ? true : false;
			let currentCode = makeCode(path + "/" + key);
			if (!type) return null;
			if (type == "object") {
				let { properties, ...fgProps } = rest;
				return (
					<FieldGroup key={currentCode} code={currentCode} label={title} {...fgProps}>
						{schema?.properties ? createLayout(schema, `${path}/${key}/properties`) : null}
						{schema?.anyOf ? createAnyOf(schema, `${path}/${key}`) : null}
					</FieldGroup>
				);
			}
			if (t)
				return (
					<FieldLayout
						key={currentCode}
						code={currentCode}
						elements={t.map((el: any) => {
							return el != null ? el.toString() : "";
						})}
						control="select"
					></FieldLayout>
				);
			if (type == "string") {
				return (
					<FieldLayout
						key={currentCode}
						code={currentCode}
						label={title}
						description={description}
						required={r}
						{...rest}
					></FieldLayout>
				);
			}
			if (type == "number") {
				return (
					<FieldLayout
						key={currentCode}
						code={currentCode}
						label={title}
						description={description}
						fieldProps={{ name: currentCode, type: "number" }}
						{...rest}
					></FieldLayout>
				);
			}
			if (type == "boolean") {
				return (
					<FieldLayout
						key={currentCode}
						code={currentCode}
						label={title}
						description={description}
						control="checkbox"
						{...rest}
					></FieldLayout>
				);
			}
			return null;
		});
	};
	return (
		<FormLayout title={schema.title} description={schema.description} validate={schemaValidation} {...formProps}>
			<React.Fragment>
				{schema?.properties ? createLayout(schema, `${path}/properties`) : null}
				{schema?.anyOf ? createAnyOf(schema, path) : null}
			</React.Fragment>
		</FormLayout>
	);
};
