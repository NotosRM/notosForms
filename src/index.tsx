import { JSONSchema4 } from "json-schema";
import * as React from "react";
import { render } from "react-dom";
import style from "./playground/App.css";
import { JsonSchemaForm } from "./components/JsonShema/JsonSchemaForm";
import { App } from "./playground/App";
import { Charts } from "./playground/Charts";
import MonacoEditor from "react-monaco-editor";

const schema: JSONSchema4 = require("./examples/example.json");

// render(, document.getElementById("root"));
// render(<Charts />, document.getElementById("root"));
render(
	<React.Fragment>
		<div className={style.main}>
			<JsonSchemaForm schema={schema} onSubmit={(...args) => console.log(args)} />
			{/* <App /> */}
			{/* <Charts /> */}
		</div>
		{/* <div className={style.monaco}>
			<MonacoEditor 
				width="800"
				height="600"
				language="javascript"
				theme="vs-dark"
				options={{
					selectOnLineNumbers: true
				}}
			></MonacoEditor>
		</div> */}
	</React.Fragment>,
	document.getElementById("root")
);
