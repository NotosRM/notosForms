import { JSONSchema4 } from "json-schema";
import * as React from "react";
import { render } from "react-dom";
import style from "./playground/App.css";
import { JsonSchemaForm } from "./components/JsonShema/JsonSchemaForm";
import { App } from "./playground/App";
import { Charts } from "./playground/Charts";
import { Playground } from "./playground/Playground";

const schema = require("./examples/example.json");

render(<Playground schema={schema}></Playground>, document.getElementById("root"));
// render(
// 	<div className={style.main}>
// 		<JsonSchemaForm schema={schema} onSubmit={(...args) => console.log(args)} />
// 		{/* <App /> */}
// 		{/* <Charts /> */}
// 	</div>,
// 	document.getElementById("root")
// );
