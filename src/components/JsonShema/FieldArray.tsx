// import React from "react";
// import { useForm } from "react-final-form";
// import { FieldGroup } from "../Form/FieldGroup/FieldGroup";

// import styles from "./JsonSchemaForm.css";
// import { FieldArray, FieldArrayProps } from "react-final-form-arrays";

// interface FArrayProps<FieldValue = any, T extends HTMLElement = HTMLElement> {
// 	code: string;
// 	label?: string;
// 	description?: string;
// 	arrayProps?: FieldArrayProps<FieldValue, T>;
// 	items: any | any[];
// }
// const FieldArrayLayout = (props: FArrayProps) => {
// 	let { code, label, description, arrayProps, items, ...rest } = props;
// 	let formApi = useForm();
// 	if (Array.isArray(items)) return null;
// 	return (
// 		<FieldArray name={code}>
// 			{({ fields }) => {
// 				return (
// 					<FieldGroup>
// 						<div className={styles.header}>
// 							{label ? <div className={styles.label}>{label}</div> : null}
// 							<div className={styles.addon}>
// 								<div
// 									className={styles.appendItem}
// 									onClick={() => formApi.mutators.push(`${code}`)}
// 								></div>
// 							</div>
// 						</div>
// 						<div className={styles.arrayContainer}>
// 							{fields.map((name, index) => {
// 								return (
// 									<div key={currentPath + `/${name}`} className={styles.arrayElement}>
// 										<div className={styles.addon}>
// 											<div
// 												className={styles.removeItem}
// 												onClick={() => formApi.mutators.remove(`${code}`, index)}
// 											></div>
// 										</div>
// 									</div>
// 								);
// 							})}
// 						</div>
// 					</FieldGroup>
// 				);
// 			}}
// 		</FieldArray>
// 	);
// };
