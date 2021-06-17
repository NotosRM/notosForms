import React from "react";
import { FormComponent, FormModel, FormComponentType } from "../../FormModel/FormModel";
import { FieldGroup } from "../Form/FieldGroup/FieldGroup";
import { FieldLayout } from "../Form/FieldLayout/FieldLayout";
import { FormLayout } from "../Form/FormLayout/FormLayout";
import styles from "./JsonSchemaForm.css";
import { ComponentSwitcher } from "./ComponentSwitcher/ComponentSwitcher";

interface FormModelLayoutProps {
	model: FormModel;
}

export const FormModelLayout: React.FC<FormModelLayoutProps> = (props) => {
	let { components, ...rest } = props.model;
	return <FormLayout {...rest}>{components ? <Components components={components} /> : null}</FormLayout>;
};

export const Components = (props: { components: FormComponent[] }) => {
	let result = props.components.map((component) => {
		return <Component key={component.code} {...component} />;
	});
	return <React.Fragment>{result}</React.Fragment>;
};
export const Component = (props: FormComponent) => {
	if (props.type == FormComponentType.field) {
		let { type, ...rest } = props;
		return <FieldLayout {...rest} />;
	}
	if (props.type == FormComponentType.fieldGroup) {
		let { type, components, ...rest } = props;

		return <FieldGroup {...rest}>{components ? <Components components={components} /> : null}</FieldGroup>;
	}
	if (props.type == FormComponentType.oneOfComponent) {
		let { type, ...rest } = props;
		return <ComponentSwitcher key={rest.code} {...rest} />;
	}
	if (props.type == FormComponentType.anyOfComponent) {
		let { type, ...rest } = props;
		return <ComponentSwitcher key={rest.code} {...rest} />;
	}
	return null;
};
