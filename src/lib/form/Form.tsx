import * as React from "react";
import { Form as FForm, Field as FField } from "react-final-form";

export interface FormProps {
	options: FormOptions;
	layout: LayoutSchema[];
}

interface FormOptions {}

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

export const Layout: React.FC<FormProps> = ({ layout }) => {
	return (
		<FForm
			onSubmit={(...args) => console.log(args)}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<FormLayout layout={layout} />
					<button type="submit">Submit</button>
				</form>
			)}
		></FForm>
	);
};

const FormLayout: React.FC<{ layout: LayoutSchema[]; [key: string]: any }> = ({
	layout,
	title,
	description
}) => {
	return (
		<div>
			{title && <div>{title}</div>}
			{description && <div>{description}</div>}
			{layout?.map((layoutItem, idx) => {
				const Tag = LayoutControls[layoutItem.type];
				if (!Tag) return <div>Unknown type: {layoutItem.type}</div>;

				return <Tag key={idx} {...layoutItem} />;
			})}
		</div>
	);
};

interface FieldProps {
	field: string;
	title: string;
}

const Field: React.FC<FieldProps> = ({ field, title }) => {
	return (
		<div>
			<label htmlFor={field}>{title}</label>
			<br />
			<FField name={field} component="input" placeholder={title} />
			<br />
		</div>
	);
};

const LayoutControls: any = {
	form: FormLayout,
	field: Field
};
