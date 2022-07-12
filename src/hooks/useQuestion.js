import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";

export const useQuestion = (videoId) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function fetchQuestions() {
			//database related work
			const db = getDatabase(app);
			const quizRef = ref(db, "quiz/" + videoId + "/questions");
			const quizQuery = query(quizRef, orderByKey());

			try {
				setError(false);
				setLoading(true);
				//request firebase database
				const snapshort = await get(quizQuery);
				setLoading(false);
				if (snapshort.exists()) {
					setQuestions((preQuestions) => {
						return [
							...preQuestions,
							...Object.values(snapshort.val()),
						];
					});
				}
				//console.log(snapshort.val());
			} catch (err) {
				console.log(err);
				setLoading(false);
				setError(true);
			}
		}
		fetchQuestions();
	}, [videoId]);
	return {
		loading,
		error,
		questions,
	};
};
