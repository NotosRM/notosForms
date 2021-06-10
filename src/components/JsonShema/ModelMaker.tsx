import { JSONSchema4 } from "json-schema";
import { FormComponent, FormModel } from "../../FormModel/FormModel";

const maxBranches = 3;

export class JSONSchemaModelMaker {
	//TODO: типизировать все объекты
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
		// console.log(value);
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
		if (this.schema.properties) {
			let components: FormComponent[] = this.prepareComponents(this.schema.properties);
			Object.defineProperty(this.model, "components", {
				value: components,
				configurable: true,
				enumerable: true,
				writable: true
			});
		}
		// if (this.schema.anyOf || this.schema.oneOf || this.schema.allOf) {
		// 	let compositions: ICompositions = this.prepareCompositions(this.schema);
		// 	Object.defineProperty(this.model, "compositions", {
		// 		value: compositions,
		// 		configurable: true,
		// 		enumerable: true,
		// 		writable: true
		// 	});
		// }
	};
	getFormProps = (schema: JSONSchema4) => {
		let { title, description, ...rest } = schema;
		return { title, description };
	};
	prepareComponents = (properties: { [k: string]: JSONSchema4 }) => {
		let propertiesPath = this.currentPath + `/properties`;

		return Object.keys(properties || []).map((key) => {
			this.currentPath = propertiesPath + `/${key}`;
			return this.prepareComponent(properties[key]);
		});
	};

	prepareComponent: (props: JSONSchema4) => FormComponent = (props) => {
		let currentCode = makeCode(this.currentPath);
		props = pullRef(props, this.schema);

		if (props.type == "object" || props.properties) {
			let { type, title: label, description, properties, controlOptions, ...rest } = props;
			let components: FormComponent[] = [];
			if (properties) components = this.prepareComponents(properties);
			// let compositions;
			// if (anyOf || oneOf || allOf) {
			// 	compositions = this.prepareCompositions(prop);
			// }
			return {
				type: "fieldGroup",
				key: currentCode,
				code: currentCode,
				label,
				description,
				components,
				...controlOptions
				// compositions,
			};
		}
		// if (anyOf || oneOf || allOf) {
		// 	let compositions = this.prepareCompositions(prop);
		// 	return {
		// 		type: "object",
		// 		key: currentCode,
		// 		code: currentCode,
		// 		label: title,
		// 		description,
		// 		compositions,
		// 		...rest
		// 	};
		// }
		if (props.enum) {
			let { type, title: label, description, enum: elements, controlOptions, ...rest } = props;
			return {
				type: "field",
				key: currentCode,
				code: currentCode,
				label,
				description,
				elements: elements.map((el: any) => (el != null ? el.toString() : "")),
				control: "select",
				...controlOptions
			};
		}
		if (props.type == "string") {
			let { type, title: label, description, controlOptions, ...rest } = props;
			return {
				type: "field",
				key: currentCode,
				code: currentCode,
				label,
				description,
				...controlOptions
			};
		}
		if (props.type == "number" || props.type == "integer") {
			let { type, title: label, description, enum: elements, controlOptions, ...rest } = props;
			return {
				type: "field",
				key: currentCode,
				code: currentCode,
				label,
				description,
				fieldProps: { name: currentCode, type: "number" },
				...controlOptions
			};
		}
		if (props.type == "boolean") {
			let { type, title: label, description, enum: elements, controlOptions, ...rest } = props;
			return {
				type: "field",
				key: currentCode,
				code: currentCode,
				label,
				description,
				control: "checkbox",
				...controlOptions
			};
		}
		return {};
	};
}
// 	prepareCompositions: (props: JSONSchema4) => ICompositions = (props) => {
// 		const compositionsRoot = this.currentPath;
// 		let compositions: ICompositions = {};
// 		if (props?.oneOf) {
// 			this.currentPath = compositionsRoot + `/oneOf`;
// 			let selector: {
// 				elements: string[];
// 				code: string;
// 			} = { elements: [], code: this.currentPath };
// 			let oneOf = props?.oneOf.map((component: JSONSchema4, index: number) => {
// 				let { title, ...rest } = pullRef(component, this.schema);
// 				selector.elements.push(title || `Option ${index}`);
// 				return this.prepareComponent(rest);
// 			});
// 			compositions.anyOf = { components: oneOf, componentsSwitcher: selector };
// 		}
// 		if (props?.anyOf) {
// 			this.currentPath = compositionsRoot + `/anyOf`;
// 			let selector: {
// 				elements: string[];
// 				code: string;
// 			} = { elements: [], code: this.currentPath };
// 			let anyOf = props?.anyOf.map((component: JSONSchema4, index: number) => {
// 				let { title, ...rest } = pullRef(component, this.schema);
// 				selector.elements.push(title || `Option ${index}`);
// 				return this.prepareComponent(rest);
// 			});
// 			compositions.anyOf = { components: anyOf, componentsSwitcher: selector };
// 		}
// 		//TODO: реализовать allOf
// 		return compositions;
// 	};
// }

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
