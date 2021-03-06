import { JSONSchema4 } from "json-schema";
import {
	FormComponent,
	FormComponentType,
	FormModel,
	CompositionComponent,
	anyOfComponent,
	oneOfComponent
} from "../../FormModel/FormModel";

const maxBranches = 3;

export class JSONSchemaModelMaker {
	constructor(schema: JSONSchema4) {
		this.schema = schema;
		this.model = {
			onSubmit: (...args) => console.log(args)
		};
	}
	schema: JSONSchema4;
	model: FormModel;
	private _currentPath: string = "#";
	get currentPath(): string {
		return this._currentPath;
	}
	set currentPath(value: string) {
		this._currentPath = value;
	}

	static makeModel = (schema: JSONSchema4) => {
		const mm: JSONSchemaModelMaker = new JSONSchemaModelMaker(schema);
		mm.prepareModel();

		return mm.getModel();
	};
	getModel = () => this.model;

	prepareModel = () => {
		let formProps = this.getFormProps(this.schema);
		Object.assign(this.model, formProps);
		let components: FormComponent[] = [];
		if (this.schema.properties) {
			components = this.prepareComponents(this.schema.properties);
		}
		if (this.schema.anyOf || this.schema.oneOf) {
			components.push(...this.prepareCompositionsComponents(this.schema));
		}
		if (components.length > 0)
			Object.defineProperty(this.model, "components", {
				value: components,
				configurable: true,
				enumerable: true,
				writable: true
			});
	};
	getFormProps = (schema: JSONSchema4) => {
		let { title, description, ...rest } = schema;
		const component: any = {};
		if (title) component.title = title;
		if (description) component.description = description;
		return component;
	};
	prepareComponents = (properties: { [k: string]: JSONSchema4 }) => {
		let propertiesPath = this.currentPath + `/properties`;
		let components: FormComponent[] = [];
		Object.keys(properties || []).map((key) => {
			this.currentPath = propertiesPath + `/${key}`;
			let component = this.prepareComponent(properties[key]);
			if (Array.isArray(component)) components.push(...component);
			else components.push(component);
		});
		return components;
	};
	prepareComponent = (componentSchema: JSONSchema4) => {
		let currentCode = makeCode(this.currentPath);
		componentSchema = pullRef(componentSchema, this.schema);

		const { title: label, description, controlOptions, ...props } = componentSchema;
		const component: any = {
			key: currentCode,
			code: currentCode,
			...controlOptions
		};
		if (label) component.label = label;
		if (description) component.description = description;

		if (props.type == "object" || props.properties) {
			let { type, properties, ...rest } = props;
			let components: FormComponent[] = [];
			if (properties) components = this.prepareComponents(properties);
			if (props.anyOf || props.oneOf) {
				components.push(...this.prepareCompositionsComponents(props));
			}

			return {
				type: FormComponentType.fieldGroup,
				components,
				...component
			};
		}
		if (props.anyOf || props.oneOf) {
			return this.prepareCompositionsComponents(props);
		}
		if (props.enum) {
			let { type, enum: elements, ...rest } = props;
			return {
				type: FormComponentType.field,
				elements: elements.map((el: any) => (el != null ? el.toString() : "")),
				control: "select",
				...component
			};
		}
		if (props.type == "string") {
			let { type, ...rest } = props;
			return {
				type: FormComponentType.field,
				...component
			};
		}
		if (props.type == "number" || props.type == "integer") {
			let { type, enum: elements, ...rest } = props;
			return {
				type: FormComponentType.field,
				fieldProps: { name: currentCode, type: "number" },
				...component
			};
		}
		if (props.type == "boolean") {
			let { type, enum: elements, ...rest } = props;
			return {
				type: FormComponentType.field,
				control: "checkbox",
				...component
			};
		}
		return {};
	};

	prepareCompositionsComponents: (schema: JSONSchema4) => CompositionComponent[] = (schema) => {
		const compositionsRoot = this.currentPath;
		let compositions: CompositionComponent[] = [];
		if (schema?.oneOf) {
			this.currentPath = compositionsRoot + `/oneOf`;
			let code = makeCode(this.currentPath);
			let selectorElements: string[] = [];
			let components = schema?.oneOf.map((component: JSONSchema4, index: number) => {
				this.currentPath = compositionsRoot + `/oneOf`;
				let { title, ...rest } = pullRef(component, this.schema);
				selectorElements.push(title || `Option ${index}`);
				return this.prepareComponent(rest);
			});
			let oneOf: oneOfComponent = { code, components, selectorElements, type: FormComponentType.oneOfComponent };
			compositions.push(oneOf);
		}
		if (schema?.anyOf) {
			this.currentPath = compositionsRoot + `/anyOf`;
			let code = makeCode(this.currentPath);
			let selectorElements: string[] = [];
			let components = schema?.anyOf.map((component: JSONSchema4, index: number) => {
				this.currentPath = compositionsRoot + `/anyOf`;
				let { title, ...rest } = pullRef(component, this.schema);
				selectorElements.push(title || `Option ${index}`);
				return this.prepareComponent(rest);
			});
			let anyOf: anyOfComponent = { code, components, selectorElements, type: FormComponentType.anyOfComponent };
			compositions.push(anyOf);
		}

		return compositions;
	};
}

const goToSchema = (s: JSONSchema4, path: string, splitter: string = "/") => {
	return path
		.slice(2)
		.split(splitter)
		.reduce(function (obj, key) {
			return obj[key];
		}, s);
};

const makeCode = (path: string) => {
	return path
		.slice(2)
		.split("/")
		.filter((value) => value != "properties")
		.filter((value) => value != "definitions")
		.filter((value) => value != "anyOf")
		.join(".");
};

const pullRef = (componentSchema: JSONSchema4, schema: JSONSchema4) => {
	let counter = 0;
	let { $ref, ...props } = componentSchema;
	while (componentSchema.$ref && counter < maxBranches) {
		counter++;
		componentSchema = goToSchema(schema, componentSchema.$ref);
		let { $ref, ...p } = componentSchema;
		props = Object.assign(p, props);
	}
	return props;
};
