import * as React from "react";
import styles from "./FieldGroup.css";

type GroupLayoutProps = {
	code?: string;
	label?: string;
	description?: string;
	visible?: any;
	collapsible?: boolean;
	hSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
};

export const FieldGroup: React.FC<GroupLayoutProps> = (props) => {
	let { code, label, visible, collapsible, description, hSize, children } = props;
	const [isCollapsed, setWrap] = React.useState(false);
	const onClick = () => {
		setWrap(!isCollapsed);
	};
	const BaseContent: React.FC = () => <div className={styles.content}>{children}</div>;

	return visible || visible == void 0 ? (
		<div className={styles.wrap}>
			{label ? (
				<div className={styles.header}>
					{collapsible ? (
						<React.Fragment>
							<span
								className={
									styles.collapser + (isCollapsed ? " " + styles.angleRight : " " + styles.angleDown)
								}
								onClick={onClick}
							></span>
							<a className={styles.labelCollapser} onClick={onClick}>
								{label}
							</a>
						</React.Fragment>
					) : (
						<span className={styles.label}>{label}</span>
					)}
					{description ? <i className={styles.description}>{description}</i> : null}
				</div>
			) : null}
			{!(collapsible && isCollapsed) ? <BaseContent /> : null}
		</div>
	) : null;
};
