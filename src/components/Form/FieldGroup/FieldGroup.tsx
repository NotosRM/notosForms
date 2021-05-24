import * as React from "react";
import styles from "./FieldGroup.css";

type GroupLayoutProps = {
	code?: string;
	label?: string;
	visible?: any;
	wrapper?: boolean;
};

export const FieldGroup: React.FC<GroupLayoutProps> = (props) => {
	let { code, label, visible, wrapper, children } = props;
	const WrappableContent = () => {
		const [isWrapped, setWrap] = React.useState(false);
		const Empty: React.FC = () => <React.Fragment></React.Fragment>;
		return (
			<React.Fragment>
				<span
					className={styles.wrapper}
					onClick={() => {
						setWrap(!isWrapped);
					}}
				>
					{isWrapped ? "+" : "-"}
				</span>

				{isWrapped ? null : <BaseContent />}
			</React.Fragment>
		);
	};
	const BaseContent: React.FC = () => <div className={styles.content}>{children}</div>;

	return visible || visible == void 0 ? (
		<div className={styles.wrap}>
			<div className={styles.header}>{label}</div>
			{wrapper ? <WrappableContent /> : <BaseContent />}
		</div>
	) : null;
};
