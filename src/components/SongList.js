import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CircularProgress,
	CardActions,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import { PlayArrow, Save } from "@material-ui/icons";
import React from "react"

const useStyles = makeStyles(theme => ({
	card: {
		display: "flex",
		justifyContent: "space-between",
		margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`
	},
	thumbnail: {
		objectFit: 'cover',
		width: 140,
		height: 140
	},
	content: {
		flexGrow: 1 
	}
}))

export default function SongList() {
	const loading = false;
	const song = {
		title: "Purple Rain",
		artist: "Jimmy Hendrix",
		thumbnail: "http://unsplash.it/g/500?random&blur&gravity=center",
	};

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CircularProgress color="primary" />
			</div>
		);
	}

	return (
		<div>
			{Array.from({ length: 10 }, () => song).map((song, i) => (
				<Song key={i} song={song} />
			))}
		</div>
	);
}


function Song({song}) {
	const {title,thumbnail,artist} = song;
	const classes = useStyles();
	return (
		<Card className={classes.card} >
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
						<IconButton size="small" color="primary">
							<PlayArrow />
						</IconButton>
						<IconButton size="small" color="secondary">
							<Save />
						</IconButton>
					</CardActions>
		</Card>
	);
}
