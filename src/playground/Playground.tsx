import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { JSONSchema4 } from "json-schema";
import { JsonSchemaForm } from "../components/JsonShema/JsonSchemaForm";
import style from "./Playground.css";
import { render } from "react-dom";

interface PlaygroundProps {
	schema: string;
}
const monacoEditorOptions = {
	minimap: {
		enabled: false
	},
	automaticLayout: true
};
export const Playground: React.FC<PlaygroundProps> = (props) => {
	let { schema } = props;
	let [JSONSchema, setSchema] = useState(schema);

	return (
		<div className={style.playground}>
			<div className={style.header}>
				<h2>Площадка механизма построения формы на основе JSONSchema</h2>
			</div>
			<div className={style.container}>
				<div className={style.codeEditor}>
					<Editor schema={JSONSchema}></Editor>
				</div>
				<div className={style.formWrapper}>
					<div className={style.formContainer}>
						<JsonSchemaForm
							schema={JSON.parse(JSONSchema)}
							onSubmit={(...args) => console.log(args)}
						></JsonSchemaForm>
					</div>
				</div>
				<div className={style.chartsWrapper}></div>
			</div>
		</div>
	);
};

export class Editor extends React.Component<PlaygroundProps, any> {
	constructor(props: PlaygroundProps) {
		super(props);
		this.state = {
			code: props.schema
		};
	}
	editorDidMount(editor: any, monaco: any) {
		let m = monaco;
		let e = editor;
		console.log(editor);

		editor.focus();
	}
	onChange(newValue: any, editor: any) {
		let v = newValue;
		let e = editor;
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
				// width="800"
				// height="100vh"
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
