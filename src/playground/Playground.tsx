import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { JSONSchema4 } from "json-schema";
import { JsonSchemaForm } from "../components/JsonSchema/JsonSchemaForm";
import style from "./Playground.css";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { Editor } from "./MonacoEditor";
import { Button } from "./Button";

const regForm = require("../examples/registrationForm.json");
const charts = require("../examples/chartsJSONSchema.json");

export interface PlaygroundProps {
	schema: JSONSchema4;
}
export const Playground: React.FC<PlaygroundProps> = (props) => {
	let { schema } = props;
	let [formSchema, setSchema] = useState(schema);
	let [editor, setEditorState] = useState({ code: JSON.stringify(schema, null, 4), isValid: false });

	const handleEditorCodeChange = (value: string, isValid: boolean) => {
		setEditorState({ code: value, isValid: isValid });
	};
	useEffect(() => {
		setEditorState({ code: JSON.stringify(formSchema, null, 4), isValid: false });
	}, [formSchema]);
	return (
		<div className={style.playground}>
			<div className={style.header}>
				<h2>Площадка механизма построения формы на основе JSONSchema</h2>
			</div>
			<div className={style.btnGroup}>
				<Button title={"regForm"} onClick={() => setSchema(regForm)} />
				<Button title={"charts"} onClick={() => setSchema(charts)} />
				{editor.isValid ? (
					<Button title={"Convert"} onClick={() => setSchema(JSON.parse(editor.code))} />
				) : null}
			</div>
			<div className={style.container}>
				<div className={style.codeEditor} style={{ height: `${window.innerHeight * 0.8}px` }}>
					<Editor code={editor.code} onChange={handleEditorCodeChange}></Editor>
				</div>
				<div className={style.formWrapper} style={{ height: `${window.innerHeight * 0.8 - 40}px` }}>
					<ErrorBoundary>
						<div className={style.formContainer}>
							{
								<JsonSchemaForm
									schema={formSchema}
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
