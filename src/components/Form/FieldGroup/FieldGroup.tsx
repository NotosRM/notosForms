import * as React from "react";
import styles from "./FieldGroup.css";

type FieldLayoutProps = {
	label?: string;
};

export const FieldGroup: React.FC<FieldLayoutProps> = (props) => {
	let { label, children } = props;
	return (
		<div className={styles.wrap}>
			<div className={styles.label}>{label}</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};
