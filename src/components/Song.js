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
import { PlayArrow, Save, Pause, Delete } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { SongContext } from "../App";
import { queueItemsVar } from "../graphql/cache";
import { ACTION_TYPES } from "../reducer";
import { addSongToQueue, removeSongFromQueue } from "../utilities";

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

const Song = ({ song }) => {
	const { id, title, thumbnail, artist } = song;
	const { state, dispatch } = useContext(SongContext);
	const [songPlaying, setSongPlaying] = useState(false);
	

	const classes = useStyles();

	useEffect(() => {
		const isSongPlaying = state.isPlaying && state.song.id === id;

		setSongPlaying(isSongPlaying);
	}, [state.isPlaying, state.song.id, id, song]);

	const handleTogglePlay = () => {
		dispatch({ type: ACTION_TYPES.SET_SONG, payload: { song } });
		dispatch(
			state.isPlaying
				? { type: ACTION_TYPES.PAUSE_SONG }
				: { type: ACTION_TYPES.PLAY_SONG }
		);
	};

	const handleToggleQueue = () => {
		dispatch({ type: ACTION_TYPES.SET_SONG, payload: { song } });
		if (!state.IsInQueue) {
			dispatch({ type: ACTION_TYPES.ADD_TO_QUEUE, payload: { song } });
		} else {
			dispatch({ type: ACTION_TYPES.REMOVE_FROM_QUEUE, payload: { song } });
		}
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
				<IconButton
					color="secondary"
					disabled={queueItemsVar() !== null && queueItemsVar().includes(song)}
					onClick={handleToggleQueue}
					size="small"
				>
					<Save />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Song;
