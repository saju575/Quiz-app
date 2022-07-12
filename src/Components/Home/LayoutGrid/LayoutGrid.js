import { useNavigate } from "react-router-dom";
import classes from "./LayoutGrid.module.css";
export const LayoutGrid = (params) => {
	const { id: youtubeId, title, noq } = params;
	//console.log(id);
	const navigate = useNavigate();
	const handleClick = () => {
		if (noq > 0) {
			navigate(`/quiz/${youtubeId}`, {
				state: {
					videoTitle: title,
				},
			});
		}
	};
	return (
		<div onClick={() => handleClick()} className={classes.video}>
			<img
				src={`http://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
				alt={title}
			/>
			<p>{title}</p>
			<div className={classes.qmeta}>
				<p>{noq} Questions</p>
				<p>Total points: {noq * 5}</p>
			</div>
		</div>
	);
};
