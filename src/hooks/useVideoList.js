import {
	get,
	getDatabase,
	limitToFirst,
	orderByKey,
	query,
	ref,
	startAt,
} from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase";

export const useVideoList = (page) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [videos, setVideos] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	useEffect(() => {
		async function fetchVideo() {
			//database related work
			const db = getDatabase(app);
			const videoRef = ref(db, "videos");
			const videoQuery = query(
				videoRef,
				orderByKey(),
				startAt("" + page),
				limitToFirst(8)
			);

			try {
				setError(false);
				setLoading(true);
				//request firebase database
				const snapshort = await get(videoQuery);
				setLoading(false);
				if (snapshort.exists()) {
					setVideos((preVideos) => {
						return [
							...preVideos,
							...Object.values(snapshort.val()),
						];
					});
				} else {
					setHasMore(false);
				}
				//console.log(snapshort.val());
			} catch (err) {
				console.log(err);
				setLoading(false);
				setError(true);
			}
		}
		fetchVideo();
	}, [page]);
	return {
		loading,
		error,
		videos,
		hasMore,
	};
};
