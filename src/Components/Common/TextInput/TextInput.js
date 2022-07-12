import classes from "./TextInput.module.css";
export const TextInput = ({ icon, ...rest }) => {
	return (
		<div className={classes.textInput}>
			<input {...rest} />
			<span className="material-icons-outlined"> {icon} </span>
		</div>
	);
};