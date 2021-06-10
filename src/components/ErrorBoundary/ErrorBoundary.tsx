import React from "react";

export class ErrorBoundary extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<a href="https://json-schema.org/understanding-json-schema/reference/combining.html#illogical-schemas">
					illogical schema.
				</a>
			);
		}

		return this.props.children;
	}
}
