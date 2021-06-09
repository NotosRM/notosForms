import { JSONSchema4, validate, ValidationError } from "json-schema";
import React, { useState } from "react";
import { ICompositions, IOneOf } from "../../FormModel/FormModel";
import { FieldGroup } from "../Form/FieldGroup/FieldGroup";
import { FieldLayout } from "../Form/FieldLayout/FieldLayout";
import { FormLayout, FormLayoutProps } from "../Form/FormLayout/FormLayout";
import styles from "./JsonSchemaForm.css";
import { ModelMaker } from "./ModelMaker";

interface JsonSchemaFormProps<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>
	extends FormLayoutProps<FormValues, InitialFormValues> {
	schema: JSONSchema4;
}

interface IComponent {
	componentType: "field" | "object" | "fieldArray";
	[k: string]: any;
}

export const JsonSchemaForm: React.FC<JsonSchemaFormProps> = (props) => {
	let { schema, ...formProps } = props;
	const model = ModelMaker.makeModel(schema);

	return (
		<FormLayout
			title={model.title}
			description={model.description}
			validate={schemaValidation.bind(schema)}
			{...formProps}
		>
			{model?.properties ? <Properties properties={model.properties} /> : null}
			{model?.compositions ? <Compositions {...model.compositions} /> : null}
		</FormLayout>
	);
};

const Properties = (props: { properties: { [k: string]: any } }) => {
	let result = (Object.keys(props.properties) || []).map((key, index) => {
		return <Component key={key + index} {...props.properties[key]} />;
	});
	return <React.Fragment>{result}</React.Fragment>;
};
const Component = (props: any) => {
	let { componentType, ...rest } = props;

	if (componentType == "field") return <FieldLayout {...rest} />;
	if (componentType == "object") {
		let { properties, compositions, ...r } = rest;

		return (
			<FieldGroup {...r}>
				{properties ? <Properties properties={properties} /> : null}
				{compositions ? <Compositions {...compositions} /> : null}
			</FieldGroup>
		);
	}
	if (componentType == "arrayField") {
		return null;
	}
	return null;
};

const Compositions = (props: ICompositions) => {
	let { oneOf, anyOf, allOf } = props;
	const Composition = (c: IOneOf) => {
		let {
			selector: { elements, code },
			components
		} = c;
		let [Id, setId] = useState(0);
		return (
			<FieldGroup>
				<div className={styles.header}>
					<select
						className={styles.control + " " + styles.select}
						id={`schemaSelector-${code}`}
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
	};

	return (
		<React.Fragment>
			{oneOf ? Composition(oneOf) : null}
			{anyOf ? Composition(anyOf) : null}
			{/* {allOf ? Composition("allOf", allOf) : null} */}
		</React.Fragment>
	);
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
