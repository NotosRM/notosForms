import React from "react";
import styles from "./Button.css";
export const Button = (props: { title?: string; onClick: any }) => {
	return (
		<button className={styles.btn} onClick={props.onClick}>
			{props.title}
		</button>
	);
};
