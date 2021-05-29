let errors = [
	{ property: "firstName", message: "error1" },
	{ property: "Group.gender", message: "error2" }
];

const f = (errors) => {
	let array = errors.map((e) => {
		let errorObject = {};
		let path = e.property.split(".").reverse();
		let message = e.message;
		path.forEach((key, index) => {
			if (index == 0) {
				Object.defineProperty(errorObject, key, { value: message });
			} else {
				errorObject = { key: errorObject };
			}
		});
		return errorObject;
	});
	let r = {};
	errors.forEach((key) => {
		Object.defineProperty(r, key, { value: errors[key] });
	});
	return r;
};
test("test", () => {
	console.log(f(errors));
	expect({ firstName: "error1", Group: { gender: "error2" } }).toEqual(f(errors));
});
