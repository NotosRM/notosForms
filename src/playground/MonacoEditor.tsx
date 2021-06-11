import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { monaco } from "react-monaco-editor";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
interface EditorProps {
	schema: object;
	onChange: (isEditorValid: boolean, SchemaObject: object) => void;
}
export const Editor: React.FC<EditorProps> = (props) => {
	let [isCodeValid, setValid] = useState(false);
	let [code, setCode] = useState(props.schema);

	const editorWillMount = (monaco: typeof monacoEditor) => {
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			validate: true
		});
	};

	const onChange = (newValue: string, event: any) => {
		let ev = event;
		let monacoCode;
		try {
			monacoCode = JSON.parse(newValue);
			if (monacoCode) {
				setValid(true);
				setCode(monacoCode);
				props.onChange(isCodeValid, code);
			}
		} catch (error) {}
	};
	const editorDidMount = (editor: any, monaco: any) => {
		let e = editor;
		let m = monaco;
		editor.focus();
	};
	return (
		<MonacoEditor
			options={{
				selectOnLineNumbers: true,
				minimap: {
					enabled: false
				},
				automaticLayout: true
			}}
			language="json"
			theme="vs-light"
			value={JSON.stringify(code, null, 4)}
			editorWillMount={editorWillMount}
			onChange={onChange}
			editorDidMount={editorDidMount}
		/>
	);
};
