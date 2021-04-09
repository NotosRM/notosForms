import { FormProps } from "../lib/form/Form";

export const FormPropsBase: FormProps = {
	options: {

	},
	model: {
		"title": "Simple form",
		"description": "A simple form example.",
		"properties": {
		  "firstName": {
			"type": "string",
			"title": "First name",
			"description": "Please enter first name"
		  },
		  "lastName": {
			"type": "string",
			"title": "Last name"
		  },
		  "telephone": {
			"type": "string",
			"title": "Telephone"
		  }
		}
	  },
	layout: [{
		type: "layout",
		layout: [{
			type: "field",
			field: "firstName"
		}, {
			type: "field",
			field: "lastName"
		}, {
			type: "field",
			field: "telephone"
		}]
	}]
}