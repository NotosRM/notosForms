import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
interface EditorProps {
	code: string;
	onChange: (value: string, isValid: boolean) => void;
}
export const Editor: React.FC<EditorProps> = (props) => {
	let p = props;
	const editorWillMount = (monaco: typeof monacoEditor) => {
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			validate: true
		});
	};
	const onChange = (newValue: string, event: monacoEditor.editor.IModelContentChangedEvent) => {
		let e = event;
		try {
			let n = JSON.parse(newValue);
			props.onChange(newValue, true);
		} catch (error) {
			props.onChange(newValue, false);
		}
	};
	const editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
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
			value={props.code}
			editorWillMount={editorWillMount}
			onChange={onChange}
			editorDidMount={editorDidMount}
		/>
	);
};
