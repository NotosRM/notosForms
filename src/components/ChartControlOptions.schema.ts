export type Orientation = "horizontal" | "vertical";
type AxisPosition = "start" | "end";

export type Field = string;

/**
 * @defaultSnippets
 * [
 *   {
 * 		"label": "Вертикальная гистограмма (bar)",
 * 		"body": {
 * 			"title": "$1",
 * 			"type": "2d",
 * 			"keyField": "$2",
 * 			"charts": [
 * 				{
 * 					"type": "bar",
 * 					"data": {
 * 						"valueFields": [
 * 							"$3"
 * 						]
 * 					}
 * 				}
 * 			]
 * 		}
 * 	 },
 * 	 {
 * 		"label": "Вертикальная линейная диаграмма (line)",
 * 		"body": {
 * 			"title": "$1",
 * 			"type": "2d",
 * 			"keyField": "$2",
 * 			"charts": [
 * 				{
 * 					"type": "line",
 * 					"data": {
 * 						"valueFields": [
 * 							"$3"
 * 						]
 * 					}
 * 				}
 * 			]
 * 		}
 * 	 },
 *   {
 * 		"label": "Вертикальная диаграмма с областями (area)",
 * 		"body": {
 * 			"title": "$1",
 * 			"type": "2d",
 * 			"keyField": "$2",
 * 			"charts": [
 * 				{
 * 					"type": "area",
 * 					"data": {
 * 						"valueFields": [
 * 							"$3"
 * 						]
 * 					}
 * 				}
 * 			]
 * 		}
 * 	 },
 *   {
 * 		"label": "Горизонтальная гистограмма (bar)",
 * 		"body": {
 * 			"title": "$1",
 * 			"type": "2d",
 * 			"keyField": "$2",
 * 			"axes": {
 * 				"orientation": "horizontal"
 * 			},
 * 			"charts": [
 * 				{
 * 					"type": "bar",
 * 					"data": {
 * 						"valueFields": [
 * 							"$3"
 * 						]
 * 					}
 * 				}
 * 			]
 * 		}
 * 	 },
 *   {
 * 		"label": "Кольцевая диаграмма (donut)",
 * 		"body": {
 * 			"title": "$1",
 * 			"type": "polar",
 * 			"keyField": "$2",
 * 			"chart": {
 * 				"valueField": "$3"
 * 			}
 * 		}
 * 	 }
 * ]
 */
export type ChartControlOptions = TwoDimensionalOptions | PolarOptions;

/**
 * @defaultSnippets
 * [
 *   {
 * 		"label": "Вертикальная ориентация, ось ключей снизу, ось значений слева",
 * 		"body": {
 * 			"orientation": "vertical",
 * 			"key": {
 * 				"position": "end"
 * 			},
 * 			"value": {
 * 				"position": "start"
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Вертикальная ориентация, ось ключей сверху, ось значений слева",
 * 		"body": {
 * 			"orientation": "vertical",
 * 			"key": {
 * 				"position": "start"
 * 			},
 * 			"value": {
 * 				"position": "start"
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Горизонтальная ориентация, ось ключей слева, ось значений снизу",
 * 		"body": {
 * 			"orientation": "horizontal",
 * 			"key": {
 * 				"position": "start"
 * 			},
 * 			"value": {
 * 				"position": "start"
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Горизонтальная ориентация, ось ключей справа, ось значений снизу",
 * 		"body": {
 * 			"orientation": "horizontal",
 * 			"key": {
 * 				"position": "end"
 * 			},
 * 			"value": {
 * 				"position": "end"
 * 			}
 * 		}
 * 	 }
 * ]
 */

export interface Axes {
	/**
	 * Ориентация графиков.
	 * При вертикальной ориентации ось ключей будет расположена сверху или снизу.
	 * При горизонтальной ориентации ось ключей будет расположена слева или справа.
	 * По умолчанию вертикальная.
	 */
	orientation?: Orientation;
	/**
	 * Параметры оси ключей
	 */
	key?: {
		/**
		 * Позиция оси ключей.
		 * По умолчанию равна "end", если график вертикальный и "start" - если график горизонтальный.
		 */
		position?: AxisPosition;
		/**
		 * Отображение оси.
		 * По умолчанию всегда отображается.
		 */
		visible?: boolean;
		/**
		 * Отображение линий сетки оси.
		 * По умолчанию всегда скрывается.
		 */
		gridLine?: boolean;
	};
	/**
	 * Параметры оси значений
	 */
	value?: {
		/**
		 * Позиция оси значений.
		 * По умолчанию равна "start", если график вертикальный и "end" - если график горизонтальный.
		 */
		position?: AxisPosition;
		/**
		 * Отображение оси.
		 * По умолчанию не отображается только тогда, когда все графики имеют встроенные лейблы, показывающие значения.
		 */
		visible?: boolean;
		/**
		 * Отображение линий сетки оси.
		 * По умолчанию всегда отображается
		 */
		gridLine?: boolean;
	};
}

interface ChartBlockOptions {
	/**
	 * Заголовок графика
	 */
	title: string;
	/**
	 * Наименование поля-ключа
	 */
	keyField: Field;
	/**
	 * Маркдаун тултипа
	 */
	tooltipMarkdown?: string;
	/**
	 * Отображение легенды.
	 * По умолчанию для polar-графиков отображается всегда, а для 2d-графиков - когда количество полей значений больше одного.
	 */
	legend?: boolean;
}

interface TwoDimensionalOptions extends ChartBlockOptions {
	/**
	 * Тип исчисления графика
	 */
	type: "2d";
	/**
	 * Параметры осей 2d-графика
	 *
	 */
	axes?: Axes;
	/**
	 * Параметры 2d-графиков
	 */
	charts: TwoDimensionalChart[];
}

interface PolarOptions extends ChartBlockOptions {
	/**
	 * Тип исчисления графика
	 */
	type: "polar";
	/**
	 * Параметры polar-графика
	 */
	chart: PolarChart;
}

export type TwoDimensionalChart = BarChart | LineAreaChart;

interface TwoDimensionalChartOptions {
	/**
	 * Параметры данных, привязанных к графику
	 */
	data: {
		/**
		 * Наименования отображаемых полей-значений
		 */
		valueFields: Field[];
	};
	/**
	 * Отображение графика в сегментированном виде
	 */
	isSegmented?: boolean;
}

/**
 * @defaultSnippets
 * [
 *   {
 * 		"label": "Несегментированная гистограмма (bar)",
 * 		"body": {
 * 			"type": "bar",
 * 			"isSegmented": false,
 * 			"data": {
 * 				"valueFields": [
 * 					"$1"
 * 				]
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Сегментированная гистограмма (bar)",
 * 		"body": {
 * 			"type": "bar",
 * 			"isSegmented": true,
 * 			"data": {
 * 				"valueFields": [
 * 					"$1"
 * 				]
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Сегментированная линейная диаграмма (line)",
 * 		"body": {
 * 			"type": "line",
 * 			"isSegmented": true,
 * 			"data": {
 * 				"valueFields": [
 * 					"$1"
 * 				]
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Несегментированная линейна диаграмма (line)",
 * 		"body": {
 * 			"type": "line",
 * 			"isSegmented": false,
 * 			"data": {
 * 				"valueFields": [
 * 					"$1"
 * 				]
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Сегментированная диаграмма с областями (area)",
 * 		"body": {
 * 			"type": "area",
 * 			"isSegmented": true,
 * 			"data": {
 * 				"valueFields": [
 * 					"$1"
 * 				]
 * 			}
 * 		}
 * 	 },
 *   {
 * 		"label": "Несегментированная диаграмма с областями (area)",
 * 		"body": {
 * 			"type": "area",
 * 			"isSegmented": false,
 * 			"data": {
 * 				"valueFields": [
 * 					"$1"
 * 				]
 * 			}
 * 		}
 * 	 }
 * ]
 */
interface BarChart extends TwoDimensionalChartOptions {
	/**
	 * Тип 2D-графика
	 */
	type: "bar";
}

interface LineAreaChart extends TwoDimensionalChartOptions {
	/**
	 * Тип 2D-графика
	 */
	type: "line" | "area";
	/**
	 * Отображение маркеров.
	 * По умолчанию всегда скрыты.
	 */
	markers?: boolean;
}

export interface PolarChart {
	/**
	 * Наименование отображаемого поля-значения
	 */
	valueField: Field;
}
