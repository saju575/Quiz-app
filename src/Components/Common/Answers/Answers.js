import { Fragment } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import classes from "./Answers.module.css";
export const Answers = ({ options = [], handleChange, input }) => {
	return (
		<div className={classes.answers}>
			{options.map((option, index, b) => (
				<Fragment key={index}>
					{input ? (
						<Checkbox
							key={index}
							className={classes.answer}
							text={option.title}
							value={index}
							checked={option.checked}
							onChange={(e) => handleChange(e, index)}
						/>
					) : (
						<Checkbox
							key={index}
							className={`${classes.answer} ${
								option.correct
									? classes.correct
									: option.checked
									? classes.wrong
									: null
							}`}
							text={option.title}
							defaultChecked={option.checked}
							disabled
						/>
					)}
				</Fragment>
			))}
		</div>
	);
};
