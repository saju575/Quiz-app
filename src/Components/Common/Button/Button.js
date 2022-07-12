import classes from "./Button.module.css";
export const Button = ({ className, children, ...rest }) => {
	return (
		<button {...rest} className={`${classes.button} ${className}`}>
			{children}
		</button>
	);
};
