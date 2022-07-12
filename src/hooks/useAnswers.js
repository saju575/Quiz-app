import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";

export const useAnswers = (videoId) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		async function fetchAnswers() {
			//database related work
			const db = getDatabase(app);
			const answerRef = ref(db, "answers/" + videoId + "/questions");
			const answerQuery = query(answerRef, orderByKey());

			try {
				setError(false);
				setLoading(true);
				//request firebase database
				const snapshort = await get(answerQuery);
				setLoading(false);
				if (snapshort.exists()) {
					setAnswers((preAnswers) => {
						return [
							...preAnswers,
							...Object.values(snapshort.val()),
						];
					});
				}
				//console.log(snapshort.val());
			} catch (err) {
				//console.log(err);
				setLoading(false);
				setError(true);
			}
		}
		fetchAnswers();
	}, [videoId]);
	return {
		loading,
		error,
		answers,
	};
};
