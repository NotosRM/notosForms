import { JSONSchema4 } from "json-schema";
import { JSONSchemaModelMaker } from "../components/JsonSchema/JSONSchemaModelMaker";

test("test Charts", () => {
    let schema: JSONSchema4 = {
        "title": "Charts",
        "type": "object",
        "properties": {
            "ChartControlOptions": {
                "anyOf": [
                    {
                        "$ref": "#/definitions/TwoDimensionalOptions"
                    },
                    {
                        "$ref": "#/definitions/PolarOptions"
                    }
                ]
            }
        },
        "definitions": {
            "TwoDimensionalOptions": {
                "type": "object",
                "title": "Двумерный график",
                "properties": {
                    "type": {
                        "title": "Тип исчисления графика",
                        "type": "string",
                        "enum": [
                            "2d"
                        ]
                    },
                    "axes": {
                        "$ref": "#/definitions/Axes"
                    },
                    "charts": {
                        "title": "Параметры 2d-графиков",
                        "type": "object",
                        "anyOf": [
                            {
                                "$ref": "#/definitions/BarChart"
                            },
                            {
                                "$ref": "#/definitions/LineAreaChart"
                            }
                        ]
                    },
                    "title": {
                        "title": "Заголовок графика",
                        "type": "string"
                    },
                    "keyField": {
                        "title": "Наименование поля-ключа",
                        "type": "string"
                    },
                    "tooltipMarkdown": {
                        "title": "Маркдаун тултипа",
                        "type": "string"
                    },
                    "legend": {
                        "title": "Отображение легенды.",
                        "description": "По умолчанию для polar-графиков отображается всегда, а для 2d-графиков - когда количество полей значений больше одного.",
                        "type": "boolean"
                    }
                },
                "required": [
                    "charts",
                    "keyField",
                    "title",
                    "type"
                ]
            },
            "Axes": {
                "type": "object",
                "title": "Параметры осей 2d-графика",
                "properties": {
                    "orientation": {
                        "$ref": "#/definitions/Orientation"
                    },
                    "key": {
                        "title": "Параметры оси ключей",
                        "type": "object",
                        "properties": {
                            "position": {
                                "$ref": "#/definitions/AxisPosition",
                                "title": "Позиция оси ключей.",
                                "description": "По умолчанию равна \"end\", если график вертикальный и \"start\" - если график горизонтальный."
                            },
                            "visible": {
                                "title": "Отображение оси.",
                                "description": "\nПо умолчанию всегда отображается.",
                                "type": "boolean"
                            },
                            "gridLine": {
                                "title": "Отображение линий сетки оси.",
                                "description": "По умолчанию всегда скрывается.",
                                "type": "boolean"
                            }
                        }
                    },
                    "value": {
                        "title": "Параметры оси значений",
                        "type": "object",
                        "properties": {
                            "position": {
                                "$ref": "#/definitions/AxisPosition",
                                "title": "Позиция оси значений.",
                                "description": "По умолчанию равна \"start\", если график вертикальный и \"end\" - если график горизонтальный."
                            },
                            "visible": {
                                "title": "Отображение оси.",
                                "description": "По умолчанию не отображается только тогда, когда все графики имеют встроенные лейблы, показывающие значения.",
                                "type": "boolean"
                            },
                            "gridLine": {
                                "title": "Отображение линий сетки оси.\nПо умолчанию всегда отображается",
                                "type": "boolean"
                            }
                        }
                    }
                }
            },
            "Orientation": {
                "enum": [
                    "horizontal",
                    "vertical"
                ],
                "type": "string",
                "title": "Ориентация графиков.",
                "description": "При вертикальной ориентации ось ключей будет расположена сверху или снизу.\nПри горизонтальной ориентации ось ключей будет расположена слева или справа.\nПо умолчанию вертикальная."
            },
            "AxisPosition": {
                "enum": [
                    "end",
                    "start"
                ],
                "type": "string"
            },
            "BarChart": {
                "type": "object",
                "properties": {
                    "type": {
                        "title": "Тип 2D-графика",
                        "type": "string",
                        "enum": [
                            "bar"
                        ]
                    },
                    "data": {
                        "title": "Параметры данных, привязанных к графику",
                        "type": "object",
                        "properties": {
                            "valueFields": {
                                "title": "Наименования отображаемых полей-значений",
                                "type": "string"
                            }
                        },
                        "required": [
                            "valueFields"
                        ]
                    },
                    "isSegmented": {
                        "title": "Отображение графика в сегментированном виде",
                        "type": "boolean"
                    }
                },
                "required": [
                    "data",
                    "type"
                ]
            },
            "LineAreaChart": {
                "type": "object",
                "properties": {
                    "type": {
                        "title": "Тип 2D-графика",
                        "enum": [
                            "area",
                            "line"
                        ],
                        "type": "string"
                    },
                    "markers": {
                        "title": "Отображение маркеров.",
                        "description": "По умолчанию всегда скрыты.",
                        "type": "boolean"
                    },
                    "data": {
                        "title": "Параметры данных, привязанных к графику",
                        "type": "object",
                        "properties": {
                            "valueFields": {
                                "title": "Наименования отображаемых полей-значений",
                                "type": "string"
                            }
                        },
                        "required": [
                            "valueFields"
                        ]
                    },
                    "isSegmented": {
                        "title": "Отображение графика в сегментированном виде",
                        "type": "boolean"
                    }
                },
                "required": [
                    "data",
                    "type"
                ]
            },
            "PolarOptions": {
                "type": "object",
                "title": "Донат график",
                "properties": {
                    "type": {
                        "title": "Тип исчисления графика",
                        "type": "string",
                        "enum": [
                            "polar"
                        ]
                    },
                    "chart": {
                        "$ref": "#/definitions/PolarChart",
                        "title": "Параметры polar-графика"
                    },
                    "title": {
                        "title": "Заголовок графика",
                        "type": "string"
                    },
                    "keyField": {
                        "title": "Наименование поля-ключа",
                        "type": "string"
                    },
                    "tooltipMarkdown": {
                        "title": "Маркдаун тултипа",
                        "type": "string"
                    },
                    "legend": {
                        "title": "Отображение легенды.",
                        "description": "По умолчанию для polar-графиков отображается всегда, а для 2d-графиков - когда количество полей значений больше одного.",
                        "type": "boolean"
                    }
                },
                "required": [
                    "chart",
                    "keyField",
                    "title",
                    "type"
                ]
            },
            "PolarChart": {
                "type": "object",
                "properties": {
                    "valueField": {
                        "title": "Наименование отображаемого поля-значения",
                        "type": "string"
                    }
                },
                "required": [
                    "valueField"
                ]
            }
        }
    }
    let model = {
        "title": "Charts",
        "components": [
            {
                "code": "ChartControlOptions",
                "components": [
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 0,
                                "elements": [
                                    "2d"
                                ],
                                "control": "select",
                                "key": "ChartControlOptions.type",
                                "code": "ChartControlOptions.type",
                                "label": "Тип исчисления графика"
                            },
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 0,
                                        "elements": [
                                            "horizontal",
                                            "vertical"
                                        ],
                                        "control": "select",
                                        "key": "ChartControlOptions.axes.orientation",
                                        "code": "ChartControlOptions.axes.orientation",
                                        "label": "Ориентация графиков.",
                                        "description": "При вертикальной ориентации ось ключей будет расположена сверху или снизу.\nПри горизонтальной ориентации ось ключей будет расположена слева или справа.\nПо умолчанию вертикальная."
                                    },
                                    {
                                        "type": 1,
                                        "components": [
                                            {
                                                "type": 0,
                                                "elements": [
                                                    "end",
                                                    "start"
                                                ],
                                                "control": "select",
                                                "key": "ChartControlOptions.axes.key.position",
                                                "code": "ChartControlOptions.axes.key.position",
                                                "label": "Позиция оси ключей.",
                                                "description": "По умолчанию равна \"end\", если график вертикальный и \"start\" - если график горизонтальный."
                                            },
                                            {
                                                "type": 0,
                                                "control": "checkbox",
                                                "key": "ChartControlOptions.axes.key.visible",
                                                "code": "ChartControlOptions.axes.key.visible",
                                                "label": "Отображение оси.",
                                                "description": "\nПо умолчанию всегда отображается."
                                            },
                                            {
                                                "type": 0,
                                                "control": "checkbox",
                                                "key": "ChartControlOptions.axes.key.gridLine",
                                                "code": "ChartControlOptions.axes.key.gridLine",
                                                "label": "Отображение линий сетки оси.",
                                                "description": "По умолчанию всегда скрывается."
                                            }
                                        ],
                                        "key": "ChartControlOptions.axes.key",
                                        "code": "ChartControlOptions.axes.key",
                                        "label": "Параметры оси ключей"
                                    },
                                    {
                                        "type": 1,
                                        "components": [
                                            {
                                                "type": 0,
                                                "elements": [
                                                    "end",
                                                    "start"
                                                ],
                                                "control": "select",
                                                "key": "ChartControlOptions.axes.value.position",
                                                "code": "ChartControlOptions.axes.value.position",
                                                "label": "Позиция оси значений.",
                                                "description": "По умолчанию равна \"start\", если график вертикальный и \"end\" - если график горизонтальный."
                                            },
                                            {
                                                "type": 0,
                                                "control": "checkbox",
                                                "key": "ChartControlOptions.axes.value.visible",
                                                "code": "ChartControlOptions.axes.value.visible",
                                                "label": "Отображение оси.",
                                                "description": "По умолчанию не отображается только тогда, когда все графики имеют встроенные лейблы, показывающие значения."
                                            },
                                            {
                                                "type": 0,
                                                "control": "checkbox",
                                                "key": "ChartControlOptions.axes.value.gridLine",
                                                "code": "ChartControlOptions.axes.value.gridLine",
                                                "label": "Отображение линий сетки оси.\nПо умолчанию всегда отображается"
                                            }
                                        ],
                                        "key": "ChartControlOptions.axes.value",
                                        "code": "ChartControlOptions.axes.value",
                                        "label": "Параметры оси значений"
                                    }
                                ],
                                "key": "ChartControlOptions.axes",
                                "code": "ChartControlOptions.axes",
                                "label": "Параметры осей 2d-графика"
                            },
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "code": "ChartControlOptions.charts",
                                        "components": [
                                            {
                                                "type": 1,
                                                "components": [
                                                    {
                                                        "type": 0,
                                                        "elements": [
                                                            "bar"
                                                        ],
                                                        "control": "select",
                                                        "key": "ChartControlOptions.charts.type",
                                                        "code": "ChartControlOptions.charts.type",
                                                        "label": "Тип 2D-графика"
                                                    },
                                                    {
                                                        "type": 1,
                                                        "components": [
                                                            {
                                                                "type": 0,
                                                                "key": "ChartControlOptions.charts.data.valueFields",
                                                                "code": "ChartControlOptions.charts.data.valueFields",
                                                                "label": "Наименования отображаемых полей-значений"
                                                            }
                                                        ],
                                                        "key": "ChartControlOptions.charts.data",
                                                        "code": "ChartControlOptions.charts.data",
                                                        "label": "Параметры данных, привязанных к графику"
                                                    },
                                                    {
                                                        "type": 0,
                                                        "control": "checkbox",
                                                        "key": "ChartControlOptions.charts.isSegmented",
                                                        "code": "ChartControlOptions.charts.isSegmented",
                                                        "label": "Отображение графика в сегментированном виде"
                                                    }
                                                ],
                                                "key": "ChartControlOptions.charts",
                                                "code": "ChartControlOptions.charts"
                                            },
                                            {
                                                "type": 1,
                                                "components": [
                                                    {
                                                        "type": 0,
                                                        "elements": [
                                                            "area",
                                                            "line"
                                                        ],
                                                        "control": "select",
                                                        "key": "ChartControlOptions.charts.type",
                                                        "code": "ChartControlOptions.charts.type",
                                                        "label": "Тип 2D-графика"
                                                    },
                                                    {
                                                        "type": 0,
                                                        "control": "checkbox",
                                                        "key": "ChartControlOptions.charts.markers",
                                                        "code": "ChartControlOptions.charts.markers",
                                                        "label": "Отображение маркеров.",
                                                        "description": "По умолчанию всегда скрыты."
                                                    },
                                                    {
                                                        "type": 1,
                                                        "components": [
                                                            {
                                                                "type": 0,
                                                                "key": "ChartControlOptions.charts.data.valueFields",
                                                                "code": "ChartControlOptions.charts.data.valueFields",
                                                                "label": "Наименования отображаемых полей-значений"
                                                            }
                                                        ],
                                                        "key": "ChartControlOptions.charts.data",
                                                        "code": "ChartControlOptions.charts.data",
                                                        "label": "Параметры данных, привязанных к графику"
                                                    },
                                                    {
                                                        "type": 0,
                                                        "control": "checkbox",
                                                        "key": "ChartControlOptions.charts.isSegmented",
                                                        "code": "ChartControlOptions.charts.isSegmented",
                                                        "label": "Отображение графика в сегментированном виде"
                                                    }
                                                ],
                                                "key": "ChartControlOptions.charts",
                                                "code": "ChartControlOptions.charts"
                                            }
                                        ],
                                        "selectorElements": [
                                            "Option 0",
                                            "Option 1"
                                        ],
                                        "type": 3
                                    }
                                ],
                                "key": "ChartControlOptions.charts",
                                "code": "ChartControlOptions.charts",
                                "label": "Параметры 2d-графиков"
                            },
                            {
                                "type": 0,
                                "key": "ChartControlOptions.title",
                                "code": "ChartControlOptions.title",
                                "label": "Заголовок графика"
                            },
                            {
                                "type": 0,
                                "key": "ChartControlOptions.keyField",
                                "code": "ChartControlOptions.keyField",
                                "label": "Наименование поля-ключа"
                            },
                            {
                                "type": 0,
                                "key": "ChartControlOptions.tooltipMarkdown",
                                "code": "ChartControlOptions.tooltipMarkdown",
                                "label": "Маркдаун тултипа"
                            },
                            {
                                "type": 0,
                                "control": "checkbox",
                                "key": "ChartControlOptions.legend",
                                "code": "ChartControlOptions.legend",
                                "label": "Отображение легенды.",
                                "description": "По умолчанию для polar-графиков отображается всегда, а для 2d-графиков - когда количество полей значений больше одного."
                            }
                        ],
                        "key": "ChartControlOptions",
                        "code": "ChartControlOptions"
                    },
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 0,
                                "elements": [
                                    "polar"
                                ],
                                "control": "select",
                                "key": "ChartControlOptions.type",
                                "code": "ChartControlOptions.type",
                                "label": "Тип исчисления графика"
                            },
                            {
                                "type": 1,
                                "components": [
                                    {
                                        "type": 0,
                                        "key": "ChartControlOptions.chart.valueField",
                                        "code": "ChartControlOptions.chart.valueField",
                                        "label": "Наименование отображаемого поля-значения"
                                    }
                                ],
                                "key": "ChartControlOptions.chart",
                                "code": "ChartControlOptions.chart",
                                "label": "Параметры polar-графика"
                            },
                            {
                                "type": 0,
                                "key": "ChartControlOptions.title",
                                "code": "ChartControlOptions.title",
                                "label": "Заголовок графика"
                            },
                            {
                                "type": 0,
                                "key": "ChartControlOptions.keyField",
                                "code": "ChartControlOptions.keyField",
                                "label": "Наименование поля-ключа"
                            },
                            {
                                "type": 0,
                                "key": "ChartControlOptions.tooltipMarkdown",
                                "code": "ChartControlOptions.tooltipMarkdown",
                                "label": "Маркдаун тултипа"
                            },
                            {
                                "type": 0,
                                "control": "checkbox",
                                "key": "ChartControlOptions.legend",
                                "code": "ChartControlOptions.legend",
                                "label": "Отображение легенды.",
                                "description": "По умолчанию для polar-графиков отображается всегда, а для 2d-графиков - когда количество полей значений больше одного."
                            }
                        ],
                        "key": "ChartControlOptions",
                        "code": "ChartControlOptions"
                    }
                ],
                "selectorElements": [
                    "Двумерный график",
                    "Донат график"
                ],
                "type": 3
            }
        ]
    }
    let expectModel = JSONSchemaModelMaker.makeModel(schema)
    let { onSubmit, ...rest } = expectModel;
    expect(rest).toStrictEqual(model);
})