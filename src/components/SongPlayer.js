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
import {React,useContext} from "react";
import QueuedSongList from "./QueuedSongList";
import {SongContext} from '../App'
import { useQuery } from "@apollo/client";
import { GET_QUEUED_SONGS } from "../graphql/queries";


const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
	},
	details: {
		flex: ` 0 1 auto`,
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

	const {data} = useQuery(GET_QUEUED_SONGS)


	const {state,dispatch} = useContext(SongContext)
	const {artist, title,thumbnail, duration, id } = state.song
	const classes = useStyles();


	const handleTogglePlay = () => {
		dispatch(state.isPlaying ? {type: "PAUSE_SONG"} : {type: "PLAY_SONG"});
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
						<IconButton aria-label="play/pause">
							<SkipPrevious />
						</IconButton>
						<IconButton onClick={handleTogglePlay} aria-label="play/pause">
							{state.isPlaying ? <Pause className={classes.controlsPlay}/> :
							<PlayArrow className={classes.controlsPlay} />}
						</IconButton>
						<IconButton aria-label="play/pause">
							<SkipNext />
						</IconButton>
						<Typography variant="subtitle1" component="p" color="textSecondary">
							00:00:15
						</Typography>
					</div>
					<Slider
						className={classes.slider}
						type="range"
						min={0}
						max={0}
						step={0.01}
					/>
				</div>
				<CardMedia
					className={classes.image}
					image={thumbnail}
				/>
			</Card>
			<Hidden smDown={true}>
				<QueuedSongList queue={data.queue}/>
			</Hidden>

		</>
	);
}
