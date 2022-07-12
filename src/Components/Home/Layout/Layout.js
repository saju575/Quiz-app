import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideoList } from "../../../hooks/useVideoList";
import { LayoutGrid } from "../LayoutGrid/LayoutGrid";
import classes from "./Layout.module.css";
export const Layout = () => {
	const [page, setPage] = useState(1);
	const { loading, error, videos, hasMore } = useVideoList(page);
	//console.log(videos);
	return (
		<main className={classes.main}>
			<div className="container1">
				{videos.length > 0 && (
					<InfiniteScroll
						dataLength={videos.length}
						next={() => {
							setPage(page + 8);
						}}
						hasMore={hasMore}
						loader="Loading..."
					>
						{videos.map((video, i) => (
							<LayoutGrid
								key={i}
								id={video.youtubeID}
								title={video.title}
								noq={video.noq}
							/>
						))}
					</InfiniteScroll>
				)}
				{!loading && videos.length === 0 && (
					<div className="">No data found</div>
				)}
				{error && <div>There was an error</div>}
				{loading && <div>Loading....</div>}
			</div>
		</main>
	);
};
