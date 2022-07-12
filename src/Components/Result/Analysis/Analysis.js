import { Questions } from "../Questions/Questions";
import classes from "./Analysis.module.css";
export const Analysis = ({ answers }) => {
	return (
		<div className={classes.analysis}>
			<h1>Question Analysis</h1>

			<Questions answers={answers} />
		</div>
	);
};
