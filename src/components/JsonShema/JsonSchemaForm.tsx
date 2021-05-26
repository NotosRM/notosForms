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

	let schemaValidation = (values: any) => {
		const errors: any = {};
		validate(values, schema).errors.map((e: ValidationError) => {
			Object.defineProperty(errors, e.property, { value: e.message });
		});
		return errors;
	};

	let createLayout = (parentProp: JSONSchema4) => {
		return Object.keys(parentProp || []).map((value, index) => {
			const component = parentProp[value];
			let { type, enum: t, ...rest } = component;
			if (type == "object") {
				let { properties, ...fgProps } = rest;
				return (
					<FieldGroup key={value + index} code={value} {...fgProps}>
						{createLayout(properties)}
					</FieldGroup>
				);
			}
			if (t)
				return (
					<FieldLayout key={value + index} code={value} control="select" elements={t} {...rest}></FieldLayout>
				);
			if (type == "string") {
				return <FieldLayout key={value + index} code={value} {...rest}></FieldLayout>;
			}
			if (type == "number") {
				return (
					<FieldLayout
						key={value + index}
						code={value}
						fieldProps={{ type: "number" }}
						{...rest}
					></FieldLayout>
				);
			}
			if (type == "boolean") {
				return <FieldLayout key={value + index} code={value} control="checkbox" {...rest}></FieldLayout>;
			}
			return null;
		});
	};
	return (
		<FormLayout title={schema.title} description={schema.description} validate={schemaValidation} {...formProps}>
			{createLayout(schema.properties || {})}
		</FormLayout>
	);
};
