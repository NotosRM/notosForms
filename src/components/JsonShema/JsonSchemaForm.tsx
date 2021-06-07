import { JSONSchema4, JSONSchema4TypeName, validate, ValidationError } from "json-schema";
import React, { Component, useEffect, useState } from "react";
import { FormSpy } from "react-final-form";
import { FieldGroup } from "../Form/FieldGroup/FieldGroup";
import { FieldLayout, FieldLayoutProps } from "../Form/FieldLayout/FieldLayout";
import { FormLayout, FormLayoutProps } from "../Form/FormLayout/FormLayout";
import styles from "./JsonSchemaForm.css";

interface JsonSchemaFormProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
	extends FormLayoutProps<FormValues, InitialFormValues> {
	schema: JSONSchema4;
}
interface CompositionProps {
	type: "anyOf" | "oneOf" | "allOf";
	components: JSONSchema4[];
}

const maxBranches = 3;

export const JsonSchemaForm: React.FC<JsonSchemaFormProps> = (props) => {
	let { schema, ...formProps } = props;
	//TODO: передавать в функции/функциональные компоненты их путь, а не хранить его в корне, тогда все компоненты будут независмыми?
	// Возникнет трудность с $ref

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

	const pullRef = (componentSchema: JSONSchema4) => {
		let counter = 0;
		let { $ref, ...props } = componentSchema;
		while (componentSchema.$ref && counter < maxBranches) {
			counter++;
			componentSchema = goToSchema(schema, componentSchema.$ref);
			let { $ref, ...p } = componentSchema;
			props = Object.assign(p, props);
		}
		return props;
	};

	const drawCompositions = (s: JSONSchema4) => {
		const compositionsRoot = currentPath;

		const Composition = (type: any, components: any) => {
			currentPath = compositionsRoot + `/${type}`;
			//TODO: Компоненты, которые не июеют полей для отрисовки не должны входить в список
			let elements: string[] = [];
			components = components.map((component: JSONSchema4, index: number) => {
				let { title, ...rest } = pullRef(component);
				elements.push(title || `Option ${index}`);
				return rest;
			});
			if (type == "oneOf" || type == "anyOf") {
				let [Id, setId] = useState(0);
				return (
					<FieldGroup>
						<div className={styles.header}>
							<select
								className={styles.control + " " + styles.select}
								id={`schemaSelector-${makeCode(currentPath)}`}
								onChange={(e) => {
									let index = elements.findIndex((value) => value == e.target.value);
									setId(index);
								}}
								value={elements[Id]}
							>
								{elements.map((element, index) => (
									<option key={element + index} value={element}>
										{element}
									</option>
								))}
							</select>
							{
								//TODO Откуда брать заголовок для группы
							}
							<div className={styles.title}></div>
						</div>
						<div className={styles.container}>{Component(components[Id])}</div>
					</FieldGroup>
				);
			}
			if (type == "allOf") return <React.Fragment>{null}</React.Fragment>;
			return null;
		};

		return (
			<React.Fragment>
				{s.oneOf ? Composition("oneOf", s.oneOf) : null}
				{s.anyOf ? Composition("anyOf", s.anyOf) : null}
				{s.allOf ? Composition("allOf", s.allOf) : null}
			</React.Fragment>
		);
	};
	const Component = (c: JSONSchema4) => {
		let { ...roma } = c;
		let currentCode = makeCode(currentPath);
		let component = pullRef(roma);
		let { type, title, description, enum: t, anyOf, oneOf, allOf, required, properties, ...rest } = component;
		let r = required ? true : false;
		if (type == "object" || properties) {
			return (
				<FieldGroup key={currentCode} code={currentCode} label={title} description={description} {...rest}>
					{properties ? drawProperties(properties) : null}
					{anyOf || oneOf || allOf ? drawCompositions(component) : null}
				</FieldGroup>
			);
		}
		if (anyOf || oneOf || allOf) {
			return drawCompositions(component);
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
			return Component(properties[key]);
		});
	};
	return (
		<FormLayout title={schema.title} description={schema.description} validate={schemaValidation} {...formProps}>
			<React.Fragment>
				{schema?.properties && drawProperties(schema.properties)}
				{drawCompositions(schema)}
			</React.Fragment>
		</FormLayout>
	);
};

const goToSchema = (s: JSONSchema4, path: string, splitter: string = "/") => {
	return path
		.slice(2)
		.split(splitter)
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
