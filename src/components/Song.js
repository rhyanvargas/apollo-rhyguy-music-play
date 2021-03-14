import { useMutation } from "@apollo/client";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActions,
	IconButton,
	makeStyles,
	// CircularProgress,
} from "@material-ui/core";
import { PlayArrow, Save, Pause } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { SongContext } from "../App";
import { queueItemsVar } from "../graphql/cache";
import { storeInLocalStorage } from "../utilities";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";
import { GET_QUEUED_SONGS } from "../graphql/queries";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		justifyContent: "space-between",
		margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
	},
	thumbnail: {
		objectFit: "cover",
		width: "100%",
		maxWidth: 140,
		minWidth: 100,
		height: 140,
	},
	content: {
		flexGrow: 1,
	},
}));

const ToggleQueueButton = ({ song }) => {
	const [addOrRemoveFromQueue, { loading, error }] = useMutation(
		ADD_OR_REMOVE_FROM_QUEUE,
		{
			// update(cache, {data}) {
			// 	const newItemFromResponse = data?.addOrRemoveFromQueue
			// 	const existingItems = cache.readQuery({
			// 		query: GET_QUEUED_SONGS
			// 	})
			// 	console.log('__APOLLO_CACHE: ', {existingItems})
			// cache.writeQuery({
			// 	query: GET_QUEUED_SONGS,
			// 	data: {
			// 		songs: [...existingItems?.songs, newItemFromResponse]
			// 	}
			// })
			// }
		}
	);
	if (loading) console.log("updating queue...");
	if (error) console.error("Error Updating queue...", error);

	const [isInQueue, toggleQueueItem] = useState(false);

	const handleToggleClick = async () => {
		if (song) {
			// Add new song to reactive variable, along with existing queue items (if exists)
			const newQueueItems = queueItemsVar(
				isInQueue
					? queueItemsVar().filter((item) => item.id !== song.id)
					: [...queueItemsVar(), song]
			);

			await new Promise((resolve) => resolve(newQueueItems));

			// Store updated queue in localstorage
			// ...todo...

			// Update the cache
			await addOrRemoveFromQueue({
				variables: { input: { ...song }, __typename: "Song" },
			});

			toggleQueueItem(!isInQueue);
			alert(`${song.title} added to the Queue!`);
			console.log("queue cache: ", queueItemsVar());
			console.log("LocalStorage: ", localStorage.getItem.length);
		}
	};

	return (
		<IconButton
			onClick={handleToggleClick}
			size="small"
			color="secondary"
			disabled={isInQueue}
		>
			<Save />
		</IconButton>
	);
};

const Song = ({ song }) => {
	const { id, title, thumbnail, artist } = song;
	const { state, dispatch } = useContext(SongContext);
	const [songPlaying, setSongPlaying] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		const isSongPlaying = state.isPlaying && state.song.id === id;
		setSongPlaying(isSongPlaying);
	}, [state.isPlaying, state.song.id, id]);

	const handleTogglePlay = () => {
		dispatch({ type: "SET_SONG", payload: { song } });
		dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
	};

	return (
		<Card className={classes.card}>
			<CardMedia className={classes.thumbnail} image={thumbnail} />
			<CardContent className={classes.content}>
				<Typography gutterBottom variant="h5" component="h2">
					{title}
				</Typography>
				<Typography
					gutterBottom
					variant="body1"
					component="p"
					color="textSecondary"
				>
					{artist}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton onClick={handleTogglePlay} size="small" color="primary">
					{songPlaying ? <Pause /> : <PlayArrow />}
				</IconButton>
				<ToggleQueueButton song={song} />
			</CardActions>
		</Card>
	);
};

export default Song;
