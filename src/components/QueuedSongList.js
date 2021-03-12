import { Typography } from "@material-ui/core";
import {React} from "react";
import QueuedSong from "./QueuedSong";

export default function QueuedSongList({queue}) {
	console.log({queue});

	const song = {
		title: "Purple Rain",
		artist: "Jimmy Hendrix",
		thumbnail: "http://unsplash.it/g/500?random&blur&gravity=center",
	};
	
	return (
		<div>
			<Typography color="textSecondary" variant="button">
				QUEUE(5)
			</Typography>
			{Array.from({ length: 5 }, () => song).map((song, i) => (
				<QueuedSong key={i} song={song} />
			))}
		</div>
	);
}
