export const Checkbox = ({ htmlFor, className, text, ...rest }) => {
	return (
		<label className={className} htmlFor={htmlFor}>
			<input type="checkbox" {...rest} /> <span>{text}</span>
		</label>
	);
};
