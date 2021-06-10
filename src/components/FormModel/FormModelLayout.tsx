import { JSONSchema4, validate, ValidationError } from "json-schema";
import React, { useState } from "react";
import { FormComponent, FieldComponent, FormModel } from "../../FormModel/FormModel";
import { FieldGroup } from "../Form/FieldGroup/FieldGroup";
import { FieldLayout } from "../Form/FieldLayout/FieldLayout";
import { FormLayout } from "../Form/FormLayout/FormLayout";
import styles from "./JsonSchemaForm.css";

import arrayMutators from "final-form-arrays";

interface FormModelLayoutProps {
	model: FormModel;
}

export const FormModelLayout: React.FC<FormModelLayoutProps> = (props) => {
	let { components, ...rest } = props.model;

	return (
		<FormLayout
			{...rest}
			mutators={{
				...arrayMutators
			}}
		>
			{components ? <Components components={components} /> : null}
			{/* {model?.compositions ? <Compositions oneOf={model.oneOf} anyOf={model.anyOf} allOf={model.allOf} /> : null} */}
		</FormLayout>
	);
};

const Components = (props: { components: FormComponent[] }) => {
	let result = props.components.map((component) => {
		return <Component key={component.code} {...component} />;
	});
	return <React.Fragment>{result}</React.Fragment>;
};
const Component = (props: FormComponent) => {
	if (props.type == "field") {
		let { type, ...rest } = props;
		return <FieldLayout {...rest}></FieldLayout>;
	}
	if (props.type == "fieldGroup") {
		let { type, components, ...rest } = props;

		return (
			<FieldGroup {...rest}>
				{components ? <Components components={components} /> : null}
				{/* {compositions ? <Compositions {...compositions} /> : null} */}
			</FieldGroup>
		);
	}
	return null;
};

// const Compositions = (props: ICompositions) => {
// 	let { oneOf, anyOf, allOf } = props;
// 	const Composition = (c: IOneOf | IAnyOf) => {
// 		let {
// 			componentsSwitcher: { code, elements },
// 			components
// 		} = c;
// 		let [Id, setId] = useState(0);
// 		return (
// 			<FieldGroup>
// 				<div className={styles.header}>
// 					<select
// 						className={styles.control + " " + styles.select}
// 						id={`schemaSelector-${code}`}
// 						onChange={(e) => {
// 							let index = elements.findIndex((value) => value == e.target.value);
// 							setId(index);
// 						}}
// 						value={elements[Id]}
// 					>
// 						{elements.map((element, index) => (
// 							<option key={element + index} value={element}>
// 								{element}
// 							</option>
// 						))}
// 					</select>
// 					<div className={styles.title}></div>
// 				</div>
// 				<div className={styles.container}>{Component(components[Id])}</div>
// 			</FieldGroup>
// 		);
// 	};

// 	return (
// 		<React.Fragment>
// 			{oneOf ? <Composition {...oneOf} /> : null}
// 			{anyOf ? <Composition {...anyOf} /> : null}
// 		</React.Fragment>
// 	);
// };
