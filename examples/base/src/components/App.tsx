import { Form } from "../lib/form/Form";
import React from "react";
import { FormPropsBase } from "../settings/base";

export const App = () => {
	return <div>
		<Form {...FormPropsBase} ></Form>
	</div>; 
};
