import { JSONSchema4, JSONSchema4TypeName, validate, ValidationError } from "json-schema";
import React, { Component, useEffect, useState } from "react";
import { FormSpy } from "react-final-form";
import { FieldGroup } from "../Form/FieldGroup/FieldGroup";
import { FieldLayout, FieldLayoutProps } from "../Form/FieldLayout/FieldLayout";
import { FormLayout, FormLayoutProps } from "../Form/FormLayout/FormLayout";

interface JsonSchemaFormProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
	extends FormLayoutProps<FormValues, InitialFormValues> {
	schema: JSONSchema4;
}

export const JsonSchemaForm: React.FC<JsonSchemaFormProps> = (props) => {
	const maxBranches = 3;
	let { schema, ...formProps } = props;
	let currentPath = "#";

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

	const drawAnyOf = (c: JSONSchema4[]) => {
		let anyOfPath = currentPath + `/anyOf`;
		currentPath = anyOfPath;
		let b = true;
		let bindingComponent: { key: string; props: any; elements: string[][] } = {
			key: "",
			props: {},
			elements: []
		};
		let components = c.map((s: JSONSchema4, index: number) => {
			let counter = 0;
			let { $ref, ...props } = s;
			while (s.$ref && counter < maxBranches) {
				counter++;
				s = goToSchema(schema, s.$ref);
				let { $ref, ...p } = s;
				props = Object.assign(p, props);
			}
			let { properties, ...rest } = props;
			if (properties) {
				let propKeys = Object.keys(properties);
				let currentKey = propKeys[0];
				if (propKeys.length == 0) {
					b = false;
				}
				let { enum: t, ...component } = properties[propKeys[0]];
				if (bindingComponent.key == "") {
					bindingComponent.key = currentKey;
				}
				if (bindingComponent.key != currentKey) b = false;
				if (t) {
					bindingComponent.props = Object.assign(component, bindingComponent.props);
					bindingComponent.elements[index] = t as string[];
				} else b = false;
			} else b = false;
			return props;
		});
		let [componentId, setId] = useState(0);
		const LinkedGroup = (lgProps: any) => {
			let { component, ignorProp } = lgProps;
			return (
				<FieldGroup label={component.title} description={component.description}>
					{drawProperties(component.properties, ignorProp)}
					{component.anyOf ? drawAnyOf(component.anyOf) : null}
				</FieldGroup>
			);
		};
		let WRONGCODE = currentPath;
		if (b) {
			let bcCode = makeCode(`${anyOfPath}/${bindingComponent.key}`);
			return (
				<React.Fragment>
					<FieldLayout
						code={bcCode}
						control="select"
						elements={bindingComponent.elements.reduce((a, b) => a.concat(b))}
						label={bindingComponent.props.title}
						{...bindingComponent.props}
					></FieldLayout>
					<FormSpy
						subscription={{ values: true }}
						onChange={({ values }) => {
							if (Object.keys(values).length > 0) {
								let bcValue = bcCode.split(".").reduce(function (obj, key) {
									if (obj?.hasOwnProperty(key)) return obj[key];
								}, Object.assign(values));
								bindingComponent.elements.forEach((el: string[], index) => {
									let i = el.findIndex((value) => value == bcValue);
									if (i != -1 && componentId != index) setId(index);
								});
							}
						}}
					/>
					<LinkedGroup component={components[componentId]} ignorProp={bindingComponent?.key}></LinkedGroup>
				</React.Fragment>
			);
		} else {
			let [componentId, setId] = useState(0);
			let elements = components.map((component, index) => {
				return component?.title || `Option ${index}`;
			});
			// TODO РЕШИТЬ ЧТО ДЕЛАТЬ с ним
			return (
				<React.Fragment>
					<FieldLayout
						code={WRONGCODE} // TODO РЕШИТЬ ЧТО ДЕЛАТЬ с ним
						control="select"
						elements={elements}
						label={bindingComponent.props.title}
					></FieldLayout>
					<FormSpy
						subscription={{ values: true }}
						onChange={({ values }) => {
							if (Object.keys(values).length > 0) {
								let bcValue = WRONGCODE.split(".").reduce(function (obj, key) {
									if (obj?.hasOwnProperty(key)) return obj[key];
								}, Object.assign(values));
								let index = elements.findIndex((value) => value == bcValue);
								if (index > -1 && componentId != index) setId(index);
							}
						}}
					/>
					<LinkedGroup component={components[componentId]}></LinkedGroup>
				</React.Fragment>
			);
		}
	};
	const createComponent = (component: JSONSchema4) => {
		let currentCode = makeCode(currentPath);
		let counter = 0;
		let { $ref, ...props } = component;
		while (component.$ref && counter < maxBranches) {
			counter++;
			component = goToSchema(schema, component.$ref);
			let { $ref, ...p } = component;
			props = Object.assign(p, props);
		}
		let { type, title, description, options, enum: t, anyOf, required, properties, ...rest } = props;
		let r = required ? true : false;
		if (type == "object" || anyOf || properties) {
			return (
				<FieldGroup key={currentCode} code={currentCode} label={title} description={description} {...rest}>
					{properties ? drawProperties(properties) : null}
					{anyOf ? drawAnyOf(anyOf) : null}
				</FieldGroup>
			);
		}
		if (t)
			return (
				<FieldLayout
					key={currentCode}
					code={currentCode}
					label={title}
					description={description}
					elements={t.map((el: any) => {
						return el != null ? el.toString() : "";
					})}
					control="select"
					{...rest}
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
	};
	let drawProperties = (properties: { [k: string]: JSONSchema4 }, ignorProp?: string) => {
		let propertiesPath = currentPath + `/properties`;
		return Object.keys(properties || []).map((key) => {
			if (ignorProp && ignorProp == key) return null;
			currentPath = propertiesPath + `/${key}`;
			return <React.Fragment key={key}>{createComponent(properties[key])}</React.Fragment>;
		});
	};
	return (
		<FormLayout title={schema.title} description={schema.description} validate={schemaValidation} {...formProps}>
			<React.Fragment>
				{schema?.properties ? drawProperties(schema.properties) : null}
				{schema?.anyOf ? drawAnyOf(schema.anyOf) : null}
			</React.Fragment>
		</FormLayout>
	);
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
		.filter((value) => value != "definitions")
		.filter((value) => value != "anyOf")
		.join(".");
};
