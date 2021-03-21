import {
	Card,
	CardContent,
	CardMedia,
	Hidden,
	IconButton,
	makeStyles,
	Slider,
	Typography,
} from "@material-ui/core";
import { PlayArrow, SkipNext, SkipPrevious, Pause } from "@material-ui/icons";
import { React, useContext, useState, useEffect, useRef } from "react";
import QueuedSongList from "./QueuedSongList";
import { SongContext } from "../App";
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import ReactPlayer from "react-player";
import { ACTION_TYPES } from "../reducer";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
	},
	details: {
		flex: ` 1 1 auto`,
		flexDirection: "column",
		padding: `10px 20px`,
	},
	content: {
		flex: "1 0 auto",
	},
	controls: {
		display: "flex",
		alignItems: "center",
	},
	controlsPlay: {
		height: 38,
		width: 38,
	},
	image: {
		width: 151,
	},
	slider: {},
}));

export default function SongPlayer() {
	const { data } = useQuery(GET_QUEUED_SONGS);
	const { state, dispatch } = useContext(SongContext);
	const { artist, title, thumbnail, duration, id } = state.song;
	const [played, setplayed] = useState(0);
	const [playedSeconds, setplayedSeconds] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [positionInQueue, setPositionInQueue] = useState(0);
	const reactPlayerRef = useRef();
	const classes = useStyles();

	useEffect(() => {
		const songIndex = data.queue.findIndex((item) => item.id === state.song.id);
		setPositionInQueue(songIndex);
	}, [state.song.id, data.queue]);

	useEffect(() => {
		const nextSong = data.queue[positionInQueue + 1];
		if (played >= 0.99 && nextSong) {
				setplayed(0);
				dispatch({ type: ACTION_TYPES.SET_SONG, payload: { song:  nextSong  } });
		} 
	}, [data.queue,played, dispatch,positionInQueue,state.song]);

	const handleTogglePlay = () => {
		dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
	};

	const handleProgressChange = (event, newValue) => {
		setplayed(newValue);
	};

	const handleSeekMouseDown = () => {
		setSeeking(true);
	};

	const handleSeekMouseUp = () => {
		setSeeking(false);
		reactPlayerRef.current.seekTo(played);
	};

	const formateDuration = (seconds) => {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
	};

	const handlePlayPreviousSong = () => {
		const prevSong = data.queue[positionInQueue - 1]
		if(prevSong) {
			dispatch({type: ACTION_TYPES.SET_SONG, payload: {song: prevSong}})
		}
	}

	const handlePlayNextSong = () => {
		const nextSong = data.queue[positionInQueue + 1];
		if(nextSong) {
			dispatch({type: ACTION_TYPES.SET_SONG, payload: {song: nextSong}})
		}
	}

	return (
		<>
			<Card className={classes.container}>
				<div className={classes.details}>
					<div className={classes.content}>
						<CardContent>
							<Typography variant="h5" component="h3">
								{title}
							</Typography>
							<Typography variant="subtitle1" component="p">
								{artist}
							</Typography>
						</CardContent>
					</div>
					<div className={classes.controls}>
						<IconButton onClick={handlePlayPreviousSong} aria-label="play/pause">
							<SkipPrevious />
						</IconButton>
						<IconButton onClick={handleTogglePlay} aria-label="play/pause">
							{state.isPlaying ? (
								<Pause className={classes.controlsPlay} />
							) : (
								<PlayArrow className={classes.controlsPlay} />
							)}
						</IconButton>
						<IconButton onClick={handlePlayNextSong} aria-label="play/pause">
							<SkipNext />
						</IconButton>
						<Typography variant="subtitle1" component="p" color="textSecondary">
							{formateDuration(playedSeconds)}
						</Typography>
					</div>
					<Slider
						onMouseUp={handleSeekMouseUp}
						onMouseDown={handleSeekMouseDown}
						onChange={handleProgressChange}
						className={classes.slider}
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={played}
					/>
				</div>
				<ReactPlayer
					ref={reactPlayerRef}
					onProgress={({ played, playedSeconds }) => {
						if (!seeking) {
							setplayed(played);
							setplayedSeconds(playedSeconds);
						}
					}}
					hidden
					url={state.song.url}
					playing={state.isPlaying}
				/>
				<CardMedia className={classes.image} image={thumbnail} />
			</Card>
			<Hidden smDown={true}>
				<QueuedSongList queue={data.queue} />
			</Hidden>
		</>
	);
}
