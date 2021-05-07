import React from "react";
import style from "./App.css";
import { FormLayout } from "./FormLayout/FormLayout";

export const App = () => {
	return (
		<div className={style.main}>
			<FormLayout title="Example form" />
		</div>
	);
};
