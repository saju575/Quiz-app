import { Answers } from "../../Common/Answers/Answers";
import classes from "./Questions.module.css";

export const Questions = ({ answers = [] }) => {
	return answers.map((answer, index) => (
		<div className={classes.question} key={index}>
			<div className={classes.qtitle}>
				<span className="material-icons-outlined"> help_outline </span>
				{answer.title}
			</div>
			<Answers input={false} options={answer.options} />
		</div>
	));
};
