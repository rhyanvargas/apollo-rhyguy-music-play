import { useQuery } from "@apollo/react-hooks";
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
import React from "react";
import { GET_SONGS } from "../graphql/queries";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		justifyContent: "space-between",
		margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
	},
	thumbnail: {
		objectFit: "cover",
		width: 140,
		height: 140,
	},
	content: {
		flexGrow: 1,
	},
}));

export default function SongList() {
	const { data, loading, error } = useQuery(GET_SONGS);

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

	if (error) {
		console.log(error);
		return <div>Error fetching songs</div>;
	}

	return (
		<div>
			{data.songs.map((song) => (
				<Song key={song.id} song={song} />
			))}
		</div>
	);
}

function Song({ song }) {
	const { title, thumbnail, artist } = song;
	const classes = useStyles();
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
