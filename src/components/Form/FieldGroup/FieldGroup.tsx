import * as React from "react";
import styles from "./FieldGroup.css";

type GroupLayoutProps = {
	code?: string;
	label?: string;
	visible?: any;
	collapsible?: boolean;
	hSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
};

export const FieldGroup: React.FC<GroupLayoutProps> = (props) => {
	let { code, label, visible, collapsible, hSize, children } = props;
	const [isCollapsed, setWrap] = React.useState(false);
	const BaseContent: React.FC = () => <div className={styles.content}>{children}</div>;

	return visible || visible == void 0 ? (
		<div className={styles.wrap}>
			{label ? (
				<div className={styles.header}>
					{collapsible ? (
						<span
							className={
								styles.collapser + (isCollapsed ? " " + styles.angleRight : " " + styles.angleDown)
							}
							onClick={() => {
								setWrap(!isCollapsed);
							}}
						></span>
					) : null}
					<span>{label}</span>
				</div>
			) : null}
			{!(collapsible && isCollapsed) ? <BaseContent /> : null}
		</div>
	) : null;
};
