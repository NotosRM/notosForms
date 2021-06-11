import React from "react";
import styles from "./Button.css";
export const Button = (props: { title?: string; onClick: any; disabled?: boolean }) => {
	return (
		<button className={styles.btn} onClick={props.onClick} disabled={props.disabled}>
			{props.title}
		</button>
	);
};
