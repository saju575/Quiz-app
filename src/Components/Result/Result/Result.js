import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import { useAnswers } from "../../../hooks/useAnswers";
import { Analysis } from "../Analysis/Analysis";
import { Summary } from "../Summary/Summary";

export const Result = () => {
	const { id } = useParams();
	const { state } = useLocation();
	const { qna } = state;
	const { loading, error, answers } = useAnswers(id);
	const calculate = () => {
		let score = 0;
		answers.forEach((question, index) => {
			let correctIndexes = [];
			let checkedIndexes = [];
			question.options.forEach((option, index2) => {
				if (option.correct) correctIndexes.push(index2);
				if (qna[index].options[index2].checked) {
					checkedIndexes.push(index2);
					option.checked = true;
				}
			});
			if (_.isEqual(correctIndexes, checkedIndexes)) {
				score = score + 5;
			}
		});
		return score;
	};

	const userScore = calculate();
	return (
		<div className="container1">
			{loading && <div>Loading...</div>}
			{error && <div>There was an error !</div>}
			{answers && answers.length > 0 && (
				<>
					<Summary score={userScore} noq={answers.length} />
					<Analysis answers={answers} />
				</>
			)}
		</div>
	);
};
