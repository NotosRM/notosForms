import * as React from "react";
import { FormSpy } from "react-final-form";
import styles from "./FieldGroup.css";

type GroupLayoutProps = {
	code?: string;
	label?: string;
	visible?: any;
	wrapper?: boolean;
};

export const FieldGroup: React.FC<GroupLayoutProps> = (props) => {
	let { code, label, visible, wrapper, children } = props;
	const content = (props: any) => (props.isWrapped ? null : <div className={styles.content}>{children}</div>);
	let isWrapped: boolean = false;
	let guid = () => {
		const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
	};
	let id = guid();
	return visible || visible == void 0 ? (
		<div className={styles.wrap}>
			<div className={styles.header}>
				{label}
				{wrapper ? <input type="checkbox" id={id} /> : null}
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	) : null;
};
