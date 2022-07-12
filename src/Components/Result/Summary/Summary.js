import { useMemo } from "react";
import successImg from "../../../assets/images/success.png";
import usePicFetch from "../../../hooks/usePicFetch";
import classes from "./Summary.module.css";
export const Summary = ({ score, noq }) => {
	const getKeyword = useMemo(() => {
		if ((score / (noq * 3)) * 100 < 50) {
			return "failed";
		} else if ((score / (noq * 3)) * 100 < 75) {
			return "good";
		} else if ((score / (noq * 3)) * 100 < 100) {
			return "very good ";
		} else {
			return "excellent";
		}
	}, [score, noq]);

	const { loading, error, result } = usePicFetch(
		`https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
		"GET",
		{ Authorization: process.env.REACT_APP_PEXELS_API_KEY }
	);

	const image = result ? result?.photos[0].src.medium : successImg;
	return (
		<div className={classes.summary}>
			<div className={classes.point}>
				{/* <!-- progress bar will be placed here --> */}
				<p className={classes.score}>
					Your score is <br />
					{score} out of {noq * 5}
				</p>
			</div>
			{loading && (
				<div className={classes.badge}>Loading your batch .... </div>
			)}
			{error && <div className={classes.badge}>An error occured ...</div>}
			{!loading && !error && (
				<div className={classes.badge}>
					<img src={image} alt="Success" />
				</div>
			)}
		</div>
	);
};
