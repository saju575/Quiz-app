import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import { useQuestion } from "../../../hooks/useQuestion";
import { Answers } from "../../Common/Answers/Answers";
import { MiniPlayer } from "../MiniPlayer/MiniPlayer";
import { ProgressBar } from "../ProgressBar/ProgressBar";

const intialState = null;
const reducer = (state, action) => {
	switch (action.type) {
		case "questions":
			action.value.forEach((question) => {
				question.options.forEach((option) => {
					option.checked = false;
				});
			});
			return action.value;
		case "answer":
			const questions = _.cloneDeep(state);
			questions[action.questionId].options[action.optionIndex].checked =
				action.value;
			return questions;

		default:
			return state;
	}
};

export const Quiz = () => {
	const { id } = useParams();
	const { loading, error, questions } = useQuestion(id);
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const [qna, dispatch] = useReducer(reducer, intialState);
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { videoTitle } = state;

	useEffect(() => {
		if (questions) {
			dispatch({
				type: "questions",
				value: questions,
			});
		}
	}, [questions]);

	const handleAnswerChange = (e, index) => {
		dispatch({
			type: "answer",
			questionId: currentQuestion,
			optionIndex: index,
			value: e.target.checked,
		});
	};

	//handle when user clicks the next button to get the next question

	const nextQuestion = () => {
		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion((prevCurrent) => prevCurrent + 1);
		}
	};
	//handle when user clicks the prev button to get the prev question

	const prevQuestion = () => {
		if (currentQuestion >= 1 && currentQuestion <= questions.length) {
			setCurrentQuestion((prevCurrent) => prevCurrent - 1);
		}
	};

	//calculate percentage
	const percentage =
		questions.length > 0
			? ((currentQuestion + 1) / questions.length) * 100
			: 0;

	//submit quiz
	const handleSubmit = async () => {
		const { uid } = currentUser;
		const db = getDatabase();
		const resultRef = ref(db, `result/${uid}`);

		await set(resultRef, {
			[id]: qna,
		});
		navigate(`/result/${id}`, {
			state: {
				qna,
				somthing: "somthing you want",
			},
		});
	};

	return (
		<>
			{loading && <div>Loading...</div>}
			{error && <div>There was an error !</div>}
			{!loading && !error && qna && qna.length > 0 && (
				<div className="container1">
					<h1>{qna[currentQuestion].title}</h1>
					<h4>Question can have multiple answers</h4>
					<Answers
						input={true}
						options={qna[currentQuestion].options}
						handleChange={handleAnswerChange}
					/>
					<ProgressBar
						next={nextQuestion}
						prev={prevQuestion}
						progress={percentage}
						submit={handleSubmit}
					/>
					<MiniPlayer id={id} title={videoTitle} />
				</div>
			)}
		</>
	);
};
