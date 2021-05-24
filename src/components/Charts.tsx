import React, { InputHTMLAttributes } from "react";
import { Field, FormSpy } from "react-final-form";
import style from "./App.css";
import { FieldGroup } from "./Form/FieldGroup/FieldGroup";
import { FieldLayout } from "./Form/FieldLayout/FieldLayout";
import { FormLayout } from "./Form/FormLayout/FormLayout";

export const Charts = () => {
	let twoDimensionalGroupVisibilitiy = false;
	return (
		<div className={style.main}>
			<FormLayout title="charts" onSubmit={(...args) => console.log(args)}>
				<FieldGroup label="Пользовательские настройки">
					<FieldLayout
						code="notation"
						label="Тип исчесления"
						control="select"
						elements={[
							{ value: "2d", v: "2D" },
							{ value: "polar", v: "Polar" }
						]}
					></FieldLayout>
					<FieldLayout code="show-legend" label="Показывать легенду" control="checkbox"></FieldLayout>
					<FieldLayout code="title" label="Заголовок графика"></FieldLayout>
				</FieldGroup>

				<FieldGroup label="Настройки 2D графиков" wrapper={true}>
					<FieldLayout
						code="chart-2d-type"
						label="Тип графика"
						control="select"
						elements={[
							{ value: "bar", v: "bar" },
							{ value: "line", v: "line" },
							{ value: "area", v: "area" }
						]}
					></FieldLayout>
					<FieldLayout code="is-segmented" label="Отображать сегметированно" control="checkbox"></FieldLayout>
					{/* Для line и area*/}
					<FieldLayout code="markers" label="Отображение маркеров" control="checkbox"></FieldLayout>
				</FieldGroup>
				<FieldGroup label="Настройки осей" visible={() => twoDimensionalGroupVisibilitiy}>
					{/* Ось ключей*/}
					<FieldGroup label="Параметры оси ключей">
						<FieldLayout
							code="value-axis-gridline"
							label="Отображение линий сетки"
							control="checkbox"
						></FieldLayout>
						<FieldLayout
							code="key-axis-visibility"
							label="Отображение оси"
							control="checkbox"
						></FieldLayout>
						<FieldLayout
							code="key-axis-orient"
							label="Позиция оси значений"
							control="select"
							elements={[
								{ value: "end", v: "end" },
								{ value: "start", v: "start" }
							]}
						></FieldLayout>
					</FieldGroup>
					{/* Ось значений*/}
					<FieldGroup label="Параметры оси значений">
						<FieldLayout
							code="value-axis-gridline"
							label="Отображение линий сетки"
							control="checkbox"
						></FieldLayout>
						<FieldLayout
							code="value-axis-visibility"
							label="Отображение оси"
							control="checkbox"
						></FieldLayout>
						<FieldLayout
							code="value-axis-orient"
							label="Позиция оси значений"
							control="select"
							elements={[
								{ value: "end", v: "end" },
								{ value: "start", v: "start" }
							]}
						></FieldLayout>
					</FieldGroup>
					{/* Ориентация графиков*/}
					<FieldGroup label="Ориентация графиков">
						<FieldLayout
							code="chart-orient"
							control="select"
							elements={[
								{ value: "end", v: "end" },
								{ value: "start", v: "start" }
							]}
						></FieldLayout>
					</FieldGroup>
				</FieldGroup>
			</FormLayout>
		</div>
	);
};
