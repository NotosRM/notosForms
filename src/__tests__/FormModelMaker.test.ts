
import { JSONSchema4 } from "json-schema";
import { JSONSchemaModelMaker } from "../components/JsonSchema/JSONSchemaModelMaker";

describe("test properties", () => {
	let schema: JSONSchema4 = {
		type: "object"
	};
	test("Prop type: string", () => {
		schema.properties = {
			Prop: {
				type: "string",
				title: "Заголовок",
				description: "Описание",
				minLength: 5,
				maxLength: 10
			}
		}
		const model = {
			"components": [
				{
					"type": 0,
					"key": "Prop",
					"code": "Prop",
					"label": "Заголовок",
					"description": "Описание"
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
	test("Prop type: number", () => {
		schema.properties = {
			Prop: {
				type: "number",
				title: "Заголовок",
				description: "Описание",
				minLength: 5,
				maxLength: 10
			}
		}
		const model = {
			"components": [
				{
					"type": 0,
					"key": "Prop",
					"code": "Prop",
					"label": "Заголовок",
					"description": "Описание",
					"fieldProps": {
						"name": "Prop",
						"type": "number"
					}
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
	test("Prop type: boolean", () => {
		schema.properties = {
			Prop: {
				type: "boolean",
				title: "Заголовок",
				description: "Описание"
			}
		}
		const model = {
			"components": [
				{
					"type": 0,
					"key": "Prop",
					"code": "Prop",
					"label": "Заголовок",
					"description": "Описание",
					"control": "checkbox"
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
	test("Prop with enum", () => {
		schema.properties = {
			Prop: {
				title: "Заголовок",
				description: "Описание",
				enum: ["", "value", 1, {}, null]
			}
		}
		const model = {
			"components": [
				{
					"type": 0,
					"key": "Prop",
					"code": "Prop",
					"label": "Заголовок",
					"description": "Описание",
					"elements": [
						"",
						"value",
						"1",
						"[object Object]",
						""
					],
					"control": "select"
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
});
describe("Schema Compositions tests", () => {
	let schema: JSONSchema4 = {
		type: "object"
	};
	test("formCompositions", () => {
		schema.anyOf = [
			{
				"properties": {
					"FirstProp": {
						"type": "string",
						"title": "Заголовок 1",
						"description": "Описание 1"
					}
				}
			},
			{
				"properties": {
					"SecondProp": {
						"type": "string",
						"title": "Заголовок 2",
						"description": "Описание 2"
					}
				}
			}
		]
		let model = {
			"components": [
				{
					"code": "",
					"components": [
						{
							"type": 1,
							"key": "",
							"code": "",
							"components": [
								{
									"type": 0,
									"key": "FirstProp",
									"code": "FirstProp",
									"label": "Заголовок 1",
									"description": "Описание 1"
								}
							]
						},
						{
							"type": 1,
							"key": "",
							"code": "",
							"components": [
								{
									"type": 0,
									"key": "SecondProp",
									"code": "SecondProp",
									"label": "Заголовок 2",
									"description": "Описание 2"
								}
							]
						}
					],
					"selectorElements": [
						"Option 0",
						"Option 1"
					],
					"type": 3
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	})
	test("base types Compositions", () => {
		schema.anyOf = [
			{
				"properties": {
					"FirstProp": {
						"type": "string",
						"title": "Заголовок 1",
						"description": "Описание 1"
					}
				}
			},
			{
				"properties": {
					"SecondProp": {
						"type": "string",
						"title": "Заголовок 2",
						"description": "Описание 2"
					}
				}
			}
		]
		schema.oneOf = [
			{
				"properties": {
					"FirstProp": {
						"type": "boolean",
						"title": "Заголовок 3",
						"description": "Описание 3"
					}
				}
			},
			{
				"properties": {
					"SecondProp": {
						"type": "string",
						"title": "Заголовок 4",
						"description": "Описание 4",
						"enum": ["element1", "element2"]
					}
				}
			}
		]
	})

})
describe("Prop type object", () => {
	let schema: JSONSchema4 = {
		type: "object"
	};
	test("no properties", () => {
		schema.properties = {
			Prop: {
				type: "object",
				title: "Заголовок",
				description: "Описание",
			}
		}
		const model = {
			"components": [
				{
					"type": 1,
					"key": "Prop",
					"code": "Prop",
					"label": "Заголовок",
					"description": "Описание",
					"components": []
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
	test("one Prop", () => {
		schema.properties = {
			Group: {
				type: "object",
				title: "Заголовок",
				description: "Описание",
				properties: {
					Prop: {
						type: "string",
						title: "Заголовок 1",
						description: "Описание 1"
					}
				}
			}
		}
		const model = {
			"components": [
				{
					"type": 1,
					"key": "Group",
					"code": "Group",
					"label": "Заголовок",
					"description": "Описание",
					"components": [
						{
							"type": 0,
							"key": "Group.Prop",
							"code": "Group.Prop",
							"label": "Заголовок 1",
							"description": "Описание 1",
						}
					]
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
	test("many Prop", () => {
		schema.properties = {
			Group: {
				type: "object",
				title: "Заголовок",
				description: "Описание",
				properties: {
					FirstProp: {
						type: "string",
						title: "First prop",
						description: "First prop description"

					},
					SecondProp: {
						type: "string",
						title: "Second prop",
						description: "Second prop description"
					}
				}
			}
		}
		const model = {
			"components": [
				{
					"type": 1,
					"key": "Group",
					"code": "Group",
					"label": "Заголовок",
					"description": "Описание",
					"components": [
						{
							"type": 0,
							"key": "Group.FirstProp",
							"code": "Group.FirstProp",
							"label": "First prop",
							"description": "First prop description",
						},
						{
							"type": 0,
							"key": "Group.SecondProp",
							"code": "Group.SecondProp",
							"label": "Second prop",
							"description": "Second prop description",
						}
					]
				}
			]
		}
		const expectModel = JSONSchemaModelMaker.makeModel(schema);
		expect(expectModel.components).toStrictEqual(model.components)
	});
})





