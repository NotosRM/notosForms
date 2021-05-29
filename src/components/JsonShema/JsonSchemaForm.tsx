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
	const drawAnyOf = (schema: JSONSchema4, path: string) => {
		path = `${path}/anyOf`;
		let anyOfArray = goToSchema(schema, path);

		let linkedByProp = true;
		let rootKey = "";
		let elements: string[][] = [];
		let titles: string[] = [];
		//TODO: Поиск связывающего компонента. За связывающий компонент выбран 1-ый из списка, нужен другой способ
		anyOfArray.forEach((s: JSONSchema4, index: number) => {
			let counter = 0;
			while (s.$ref && counter < maxBranches) {
				counter++;
				s = goToSchema(schema, s.$ref);
			}

			let { $ref, properties, type, title, description, ...rest } = s;
			if (properties) {
				let keys = Object.keys(properties);
				let currentKey = keys[0];
				if (keys.length == 0) return null;
				let component = properties[keys[0]];
				if (rootKey == "") {
					rootKey = currentKey;
				}
				if (rootKey != currentKey) linkedByProp = false;
				if (component?.enum) {
					elements[index] = component?.enum as string[];
				} else elements[index] = [title ? title : `${currentKey}${index}`];
				titles.push(title ? title : `${currentKey}${index}`);
			} else linkedByProp = false;
		});

		let [componentPath, setPath] = useState(path + "/0");
		const LinkedGroup = (props: any) => {
			let { schema, componentPath, ignorProp, title, description } = props;
			let counter = 0;
			let s = goToSchema(schema, componentPath);

			while (s.$ref && counter < maxBranches) {
				counter++;
				componentPath = s.$ref;
				s = goToSchema(schema, s.$ref);
			}

			return (
				<FieldGroup label={title} description={description}>
					{drawProperties(schema, componentPath, ignorProp)}
				</FieldGroup>
			);
		};

		if (linkedByProp)
			return (
				<React.Fragment>
					<FieldLayout
						code={rootKey}
						control="select"
						elements={elements.reduce((a, b) => a.concat(b))}
					></FieldLayout>

					<FormSpy
						subscription={{ values: true }}
						onChange={({ values }) => {
							if (values && values[rootKey]) {
								elements.forEach((el: string[], index) => {
									let i = el.findIndex((value) => value == values[rootKey]);
									if (i != -1 && componentPath != path + `/${index}`) setPath(path + `/${index}`);
								});
							}
						}}
					/>
					<LinkedGroup schema={schema} componentPath={componentPath} ignorProp={rootKey}></LinkedGroup>
				</React.Fragment>
			);
		else {
			return (
				<React.Fragment>
					<FieldLayout code={rootKey} control="select" elements={titles}></FieldLayout>
					<FormSpy
						subscription={{ values: true }}
						onChange={({ values }) => {
							if (values && values[rootKey]) {
								let index = titles.findIndex((value) => value == values[rootKey]);
								if (index != -1 && componentPath != path + `/${index}`) setPath(path + `/${index}`);
							}
						}}
					/>
					<LinkedGroup schema={schema} componentPath={componentPath}></LinkedGroup>
				</React.Fragment>
			);
		}
	};
	const createComponent = (schema: JSONSchema4, path: string, key: string, isRef?: boolean) => {
		const fullPath = isRef ? path : `${path}/${key}`;
		const componentSchema = goToSchema(schema, fullPath);
		let {
			type,
			title,
			description,
			options,
			enum: t,
			anyOf,
			required,
			$ref,
			properties,
			...rest
		} = componentSchema;
		let r = required ? true : false;
		let currentCode = makeCode(fullPath);
		if ($ref) {
			//TODO: Продумать как прокидывать в компонент соседние для $ref пропсы?
			return <React.Fragment>{createComponent(schema, $ref, key, true)}</React.Fragment>;
		}
		if (type == "object" || anyOf || properties) {
			return (
				<FieldGroup key={currentCode} code={currentCode} label={title} {...rest}>
					{properties ? drawProperties(schema, `${fullPath}`) : null}
					{anyOf ? drawAnyOf(schema, `${fullPath}`) : null}
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
	};
	let drawProperties = (schema: JSONSchema4, path: string, ignorProp?: string) => {
		path = `${path}/properties`;
		let properties: { [k: string]: JSONSchema4 } = goToSchema(schema, path);

		return Object.keys(properties || []).map((key) => {
			if (ignorProp && ignorProp == key) return null;
			return <React.Fragment key={key}>{createComponent(schema, `${path}`, key)}</React.Fragment>;
		});
	};
	return (
		<FormLayout title={schema.title} description={schema.description} validate={schemaValidation} {...formProps}>
			<React.Fragment>
				{schema?.properties ? drawProperties(schema, path) : null}
				{schema?.anyOf ? drawAnyOf(schema, path) : null}
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
		.join(".");
};
