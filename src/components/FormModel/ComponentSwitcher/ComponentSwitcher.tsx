import React from "react";
import { useState } from "react";
import { FormComponent } from "../../../FormModel/FormModel";
import { FieldGroup } from "../../Form/FieldGroup/FieldGroup";
import { Component } from "../FormModelLayout";
import styles from "./ComponentSwitcher.css";

export interface ComponentSwitcherProps {
	// свойства для селектора переключения между компонентами
	code: string;
	// элементы переключателя
	selectorElements: string[];
	components: FormComponent[];
}

export const ComponentSwitcher: React.FC<ComponentSwitcherProps> = (props) => {
	let { code, selectorElements, components } = props;
	let [Id, setId] = useState(0);
	return (
		<FieldGroup key={code}>
			<div className={styles.header}>
				<select
					className={styles.control + " " + styles.select}
					id={`schemaSelector-${code}`}
					onChange={(e) => {
						let index = selectorElements.findIndex((value) => value == e.target.value);
						setId(index);
					}}
					value={selectorElements[Id]}
				>
					{selectorElements.map((element, index) => (
						<option key={element + index} value={element}>
							{element}
						</option>
					))}
				</select>
				<div className={styles.title}></div>
			</div>
			<div className={styles.container}>
				<Component {...components[Id]} />
			</div>
		</FieldGroup>
	);
};
