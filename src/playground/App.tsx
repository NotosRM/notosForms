import React from "react";
import { render } from "react-dom";
import { Playground } from "./Playground";
import { SimpleFormExample } from "./SimpleFormExample";
import styles from "./App.css";
const schema = require("./../examples/example.json");

export const App = () => {
	const Button = (props: { title?: string; onClick: any }) => {
		return (
			<button className={styles.btn} onClick={props.onClick}>
				{props.title}
			</button>
		);
	};
	return (
		<div className={styles.main}>
			<Button
				title="JsonSchemaForm"
				onClick={() => render(<Playground schema={schema}></Playground>, document.getElementById("root"))}
			/>
			<Button
				title="SimpleFormExample"
				onClick={() => render(<SimpleFormExample />, document.getElementById("root"))}
			/>
		</div>
	);
};
