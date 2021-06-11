import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { JSONSchema4 } from "json-schema";
import { JsonSchemaForm } from "../components/JsonShema/JsonSchemaForm";
import style from "./Playground.css";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { Editor } from "./MonacoEditor";
import { Button } from "./Button";

const regForm = require("../examples/registrationForm.json");
const charts = require("../examples/chartsJSONSchema.json");
//TODO: вынести все custom'ные свойства в contorlOptions
export interface PlaygroundProps {
	schema: JSONSchema4;
}
export const Playground: React.FC<PlaygroundProps> = (props) => {
	let { schema } = props;
	let [currentSchema, setSchema] = useState(schema);
	let [IsConvertDisabled, setConvert] = useState(true);
	return (
		<div className={style.playground}>
			<div className={style.header}>
				<h2>Площадка механизма построения формы на основе JSONSchema</h2>
			</div>
			<div className={style.btnGroup}>
				<Button title={"regForm"} onClick={() => setSchema(regForm)} />
				<Button title={"charts"} onClick={() => setSchema(charts)} />
				<Button title={"Convert"} onClick={() => setSchema(currentSchema)} disabled={IsConvertDisabled} />
			</div>
			<div className={style.container}>
				<div className={style.codeEditor} style={{ height: `${window.innerHeight * 0.8}px` }}>
					<Editor
						schema={currentSchema}
						onChange={(isEditorValid: boolean) => {
							setConvert(isEditorValid);
						}}
					></Editor>
				</div>
				<div className={style.formWrapper} style={{ height: `${window.innerHeight * 0.8 - 40}px` }}>
					<ErrorBoundary>
						<div className={style.formContainer}>
							{
								<JsonSchemaForm
									schema={currentSchema}
									onSubmit={(...args) => console.log(args)}
								></JsonSchemaForm>
							}
						</div>
					</ErrorBoundary>
				</div>
				<div className={style.chartsWrapper}></div>
			</div>
		</div>
	);
};
