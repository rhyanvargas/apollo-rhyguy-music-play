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
import { PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import { findByLabelText } from "@testing-library/react";
import React from "react";
import QueuedSongList from "./QueuedSongList";

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
	const classes = useStyles();

	return (
		<>
			<Card className={classes.container}>
				<div className={classes.details}>
					<div className={classes.content}>
						<CardContent>
							<Typography variant="h5" component="h3">
								Title
							</Typography>
							<Typography variant="subtitle1" component="p">
								Artist
							</Typography>
						</CardContent>
					</div>
					<div className={classes.controls}>
						<IconButton aria-label="play/pause">
							<SkipPrevious />
						</IconButton>
						<IconButton aria-label="play/pause">
							<PlayArrow className={classes.controlsPlay} />
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
					image="http://unsplash.it/g/500?random"
				/>
			</Card>
			<Hidden smDown={true}>
				<QueuedSongList />
			</Hidden>

		</>
	);
}
