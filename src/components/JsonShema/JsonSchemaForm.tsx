import { JSONSchema4, validate, ValidationError } from "json-schema";
import React from "react";
import { FormLayoutProps } from "../Form/FormLayout/FormLayout";
import { JSONSchemaModelMaker } from "./ModelMaker";
import { FormModelLayout } from "../FormModel/FormModelLayout";
interface JsonSchemaFormProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
	extends FormLayoutProps<FormValues, InitialFormValues> {
	schema: JSONSchema4;
}

export const JsonSchemaForm: React.FC<JsonSchemaFormProps> = (props) => {
	let { schema, ...formProps } = props;
	let model = JSONSchemaModelMaker.makeModel(schema);
	model.validate = schemaValidation.bind(schema);
	Object.assign(model, formProps);
	return <FormModelLayout model={model} />;
};

const schemaValidation = function (this: JSONSchema4, values: any) {
	let errors: any = {};
	let v = validate(values, this);

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
