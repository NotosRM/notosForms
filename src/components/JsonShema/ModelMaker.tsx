import { JSONSchema4, validate, ValidationError } from "json-schema";
import { runtime } from "webpack";
import { ICompositions } from "../../FormModel/FormModel";

const maxBranches = 3;

export class ModelMaker {
	counter: number = 0;
	//TODO: типизировать все объекты
	constructor(schema: JSONSchema4) {
		this.schema = schema;
	}
	schema: JSONSchema4;
	model: any = {};
	private _currentPath: string = "#";
	get currentPath(): string {
		return this._currentPath;
	}
	set currentPath(value: string) {
		// console.log(value);
		this._currentPath = value;
	}

	static makeModel = (schema: JSONSchema4) => {
		const mm: ModelMaker = new ModelMaker(schema);
		mm.prepareModel();
		console.log(mm.counter);

		return mm.getModel();
	};
	getModel = () => this.model;

	prepareModel = () => {
		let formProps = this.getFormProps(this.schema);
		Object.assign(this.model, formProps);
		if (this.schema.properties) {
			let properties: { [k: string]: JSONSchema4 } = this.prepareProperties(this.schema.properties);
			Object.defineProperty(this.model, "properties", {
				value: properties,
				configurable: true,
				enumerable: true,
				writable: true
			});
		}
		if (this.schema.anyOf || this.schema.oneOf || this.schema.allOf) {
			let compositions: ICompositions = this.prepareSchemaCompositions(this.schema);
			Object.defineProperty(this.model, "compositions", {
				value: compositions,
				configurable: true,
				enumerable: true,
				writable: true
			});
		}
	};
	getFormProps = (schema: JSONSchema4) => {
		let { title, description, ...rest } = schema;
		return { title, description };
	};
	prepareProperties = (properties: { [k: string]: JSONSchema4 }) => {
		let propertiesPath = this.currentPath + `/properties`;
		let result = {};
		Object.keys(properties || []).map((key) => {
			this.currentPath = propertiesPath + `/${key}`;
			return Object.defineProperty(result, key, { value: this.prepareProp(properties[key]), enumerable: true });
		});
		return result;
	};

	prepareProp = (prop: JSONSchema4) => {
		let currentCode = makeCode(this.currentPath);
		this.counter++;

		prop = pullRef(prop, this.schema);

		let { type, title, description, options, enum: t, anyOf, oneOf, allOf, required, properties, ...rest } = prop;
		let componentType = "object";
		if (type == "object" || properties) {
			if (properties) properties = this.prepareProperties(properties);
			let compositions;
			if (anyOf || oneOf || allOf) {
				compositions = this.prepareSchemaCompositions(prop);
			}
			return {
				componentType: "object",
				key: currentCode,
				code: currentCode,
				label: title,
				description,
				properties,
				compositions,
				...rest
			};
		}
		if (anyOf || oneOf || allOf) {
			let compositions = this.prepareSchemaCompositions(prop);
			return {
				componentType: "object",
				key: currentCode,
				code: currentCode,
				label: title,
				description,
				compositions,
				...rest
			};
		}
		componentType = "field";
		if (t)
			return {
				componentType,
				key: currentCode,
				code: currentCode,
				label: title,
				description,
				options,
				elements: t.map((el: any) => {
					return el != null ? el.toString() : "";
				}),
				control: "select",
				...rest
			};
		if (prop.type == "string") {
			return {
				componentType,
				key: currentCode,
				code: currentCode,
				label: title,
				description,
				options,
				...rest
			};
		}
		if (prop.type == "number" || prop.type == "integer") {
			return {
				componentType,
				key: currentCode,
				code: currentCode,
				label: title,
				description,
				options,
				fieldProps: { name: currentCode, type: "number" },
				...rest
			};
		}
		if (prop.type == "boolean") {
			return {
				componentType,
				key: currentCode,
				code: currentCode,
				label: title,
				description,
				options,
				control: "checkbox",
				...rest
			};
		}
		return {};
	};
	prepareSchemaCompositions = (props: JSONSchema4) => {
		let { anyOf, oneOf, allOf } = props;
		const compositionsRoot = this.currentPath;
		let compositions: ICompositions = {};
		if (anyOf) {
			this.currentPath = compositionsRoot + `/anyOf`;
			let selector: {
				elements: string[];
				code: string;
			} = { elements: [], code: this.currentPath };
			anyOf = anyOf.map((component: JSONSchema4, index: number) => {
				let { title, ...rest } = pullRef(component, this.schema);
				selector.elements.push(title || `Option ${index}`);
				return this.prepareProp(rest);
			});
			compositions.anyOf = { components: anyOf, selector };
			//TODO: добавить проверку для selector'а и для anyOf
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
