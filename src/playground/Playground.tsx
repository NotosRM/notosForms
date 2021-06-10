import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { JSONSchema4 } from "json-schema";
import { JsonSchemaForm } from "../components/JsonShema/JsonSchemaForm";
import style from "./Playground.css";

const regForm = require("../examples/registrationForm.json");
const charts = require("../examples/chartsJSONSchema.json");
//TODO: вынести все custom'ные свойства в contorlOptions
interface PlaygroundProps {
	schema: JSONSchema4;
}
export const Playground: React.FC<PlaygroundProps> = (props) => {
	let { schema } = props;
	let [JSONSchema, setSchema] = useState(schema);
	// currentSchema
	// monacoSchema
	let s = JSONSchema;
	// избавиться от
	let timer: NodeJS.Timeout;

	//TODO: перенсти в отдельный файл
	class Editor extends React.Component<PlaygroundProps, any> {
		constructor(props: PlaygroundProps) {
			super(props);
			this.state = {
				code: JSON.stringify(props.schema, null, 4)
			};
		}
		editorDidMount(editor: any, monaco: any) {
			let m = monaco;
			let e = editor;

			editor.focus();
		}
		onChange(newValue: any, editor: any) {
			clearTimeout(timer);
			//TODO: сделать через state: isEditorValid
			let btn = document.getElementById("#ButtonConverterJsonSchemaToForm");
			btn?.classList.add(style.hide);
			let e = editor;
			timer = setTimeout(() => {
				if (typeof newValue == "string") {
					try {
						s = JSON.parse(newValue);
						let btn = document.getElementById("#ButtonConverterJsonSchemaToForm");
						btn?.classList.remove(style.hide);
					} catch {}
				}
				if (typeof newValue == "object") s = newValue;

				clearTimeout(timer);
			}, 1500);
		}
		render() {
			const code = this.state.code;
			const options = {
				selectOnLineNumbers: true,
				minimap: {
					enabled: false
				},
				automaticLayout: true
			};
			return (
				<MonacoEditor
					language="json"
					theme="vs-light"
					value={code}
					options={options}
					onChange={this.onChange}
					editorDidMount={this.editorDidMount}
				/>
			);
		}
	}

	return (
		<div className={style.playground}>
			<div className={style.header}>
				<h2>Площадка механизма построения формы на основе JSONSchema</h2>
			</div>
			<div className={style.btnGroup}>
				<button
					className={style.btn}
					onClick={() => {
						setTimeout(() => {
							setSchema(regForm);
						}, 1000);
					}}
				>
					regForm
				</button>
				<button
					className={style.btn}
					onClick={() => {
						setTimeout(() => {
							setSchema(charts);
						}, 1000);
					}}
				>
					charts
				</button>
				<button
					className={style.btn + " " + style.hide}
					onClick={() => {
						setSchema(s);
					}}
					id={"#ButtonConverterJsonSchemaToForm"}
				>
					Covert
				</button>
			</div>
			<div className={style.container}>
				<div className={style.codeEditor} style={{ height: `${window.innerHeight * 0.8}px` }}>
					<Editor schema={JSONSchema}></Editor>
				</div>
				<div className={style.formWrapper} style={{ height: `${window.innerHeight * 0.8 - 40}px` }}>
					<ErrorBoundary>
						<div className={style.formContainer}>
							{
								<JsonSchemaForm
									schema={JSONSchema}
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

//TODO: в отдельный файл
class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// Можно отрендерить запасной UI произвольного вида
			return <h1>Что-то пошло не так.</h1>;
		}

		return this.props.children;
	}
}
