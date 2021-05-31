import { JSONSchema4 } from "json-schema";
import * as React from "react";
import { render } from "react-dom";
import style from "./playground/App.css";
import { JsonSchemaForm } from "./components/JsonShema/JsonSchemaForm";
import { App } from "./playground/App";
import { Charts } from "./playground/Charts";
import { Playground } from "./playground/Playground";

const schema = require("./examples/example.json");

// render(<Playground schema={JSON.stringify(schema, null, 4)}></Playground>, document.getElementById("root"));
render(
	<div className={style.main}>
		<App />
	</div>,
	document.getElementById("root")
);
