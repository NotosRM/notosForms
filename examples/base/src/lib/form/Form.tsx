import * as React from "react";

export interface FormProps {
	options: FormOptions;
	model: DataSchema;
	layout: LayoutSchema[];
}

interface FormOptions {}
interface DataSchema {
	//todo: json schema
	title?: string;
	description?: string;
	properties: { [field: string]: FormModelProperty };
}

interface FormModelProperty {
	//todo: enum
	type: string;
	title: string;
	description?: string;
}

type LayoutSchema = {
	type: string;
	[key: string]: any;
};

export const Form: React.FC<FormProps> = ({ model, layout }) => {
	return (
		<form noValidate>
			<FormTitle>{model.title}</FormTitle>
			<FormDescription>{model.description}</FormDescription>
			<Layout layout={layout} />
			<FormButtons />
		</form>
	);
};

const FormTitle: React.FC = (props) => {
	return <div>{props.children}</div>;
};

const FormDescription: React.FC = (props) => {
	return <div>{props.children}</div>;
};

const Layout: React.FC<{ layout: LayoutSchema[] }> = ({ layout }) => {
	return (
		<div>
			{layout?.map((layoutItem, idx) => {
				const Tag = LayoutControls[layoutItem.type];
				if (!Tag) return <div>Unknown type: {layoutItem.type}</div>;
				return <Tag key={idx} {...layoutItem} />;
			})}
		</div>
	);
};

interface FieldProps {}

const Field: React.FC<FieldProps> = () => {
	return (
		<div>
			<label htmlFor="fname">First name:</label>
			<br />
			<input type="text" id="fname" name="fname" />
			<br />
		</div>
	);
};

const LayoutControls: any = {
	layout: Layout,
	field: Field
};

const FormButtons: React.FC = () => {
	return <button>Submit</button>;
};
