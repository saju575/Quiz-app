import classes from "./Form.module.css";
export const Form = ({ children, className, ...rest }) => {
	return (
		<form className={`${className} ${classes.form}`} {...rest}>
			{children}
		</form>
	);
};
