import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	makeStyles,
} from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, { useState, useEffect } from "react";
import { customStyles } from "../theme.js";
import ReactPlayer from "react-player";
import YoutubePlayer from "react-player/lib/players/YouTube";
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "../graphql/mutations";

const useStyles = makeStyles((theme) => ({
	...customStyles,
	container: {
		display: "flex",
		alignItems: "center",
	},
	urlInput: {
		margin: theme.spacing(1),
	},
	dialog: {
		textAlign: "center",
	},
	thumbnail: {
		width: "90",
	},
}));

const DEFAULT_SONG = {
	title: "",
	duration: 0,
	artist: "",
	thumbnail: "",
};

export default function AddSong() {
	// STYLES
	const classes = useStyles();
	const [addSong] = useMutation(ADD_SONG);
	// STATE
	const [dialog, setDialog] = useState(false);
	const [url, setUrl] = useState("");
	const [playable, setPlayable] = useState(false);
	const [song, setSong] = useState(DEFAULT_SONG);

	// EFFECTS
	useEffect(() => {
		const isPlayable = YoutubePlayer.canPlay(url);
		setPlayable(isPlayable);
	}, [url]);

	// HANDLERS

	const handleChangeSong = (event) => {
		const { name, value } = event.target;
		setSong((prevSong) => ({
			...prevSong,
			[name]: value,
		}));
	};

	const handleCloseDialog = () => {
		setDialog(false);
	};

	const handleAddSong = async () => {
		try {
            const { artist, title, thumbnail, duration } = song;
			await addSong({
				variables: {
					url: url.length > 0 ? url : null,
					thumbnail: thumbnail.length > 0 ? thumbnail : null,
					duration: duration.length > 0 ? duration : null,
					title: title.length > 0 ? title : null,
					artist: artist.length > 0 ? artist : null,
				},
			});
            // Clear all values
			handleCloseDialog();
			setSong(DEFAULT_SONG);
			setUrl("");
		} catch (error) {
			console.error("⚠️ ERROR ADDING SONG: ", error);
			alert("Please enter all info before you can add song");
		}
	};

	const handleEditSong = async ({ player }) => {
		const nestedPlayer = player.player.player;
		let songData;

		if (nestedPlayer.getVideoData) {
			songData = getYoutubeInfo(nestedPlayer);
			const { title, artist, duration, thumbnail } = songData;
			setSong({
				title,
				artist,
				duration,
				thumbnail,
			});
		}
	};

	const getYoutubeInfo = (player) => {
		const duration = player.getDuration();
		const { title, video_id, author } = player.getVideoData();
		const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;

		return {
			duration,
			title,
			artist: author,
			thumbnail,
		};
	};

	// DISPLAY
	const inputProps = {
		startAdornment: (
			<InputAdornment position="start">
				<Link />
			</InputAdornment>
		),
	};

	const { title, artist, thumbnail, duration } = song;

	return (
		<div className={classes.container}>
			<Dialog
				className={classes.dialog}
				open={dialog}
				onClose={handleCloseDialog}
			>
				<DialogTitle></DialogTitle>
				<DialogContent>
					<img
						className={classes.imgResponsive}
						src={thumbnail}
						alt={thumbnail.name}
					/>
					<TextField
						onChange={handleChangeSong}
						margin="dense"
						name="title"
						label="Title"
						fullWidth
						value={title}
					/>
					<TextField
						onChange={handleChangeSong}
						margin="dense"
						name="artist"
						label="Artist"
						fullWidth
						value={artist}
					/>
					<TextField
						onChange={handleChangeSong}
						margin="dense"
						name="thumbnail"
						label="Thumbnail"
						fullWidth
						value={thumbnail}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={handleAddSong} variant="outlined" color="primary">
						Add Song
					</Button>
				</DialogActions>
			</Dialog>
			<TextField
				className={classes.urlInput}
				placeholder="Add Youtube Url"
				fullWidth
				margin="normal"
				type="url"
				onChange={(event) => setUrl(event.target.value)}
				value={url}
				InputProps={inputProps}
			/>
			<Button
				onClick={() => setDialog(true)}
				disabled={!playable}
				color="primary"
				variant="contained"
				endIcon={<AddBoxOutlined />}
			>
				Add
			</Button>
			<ReactPlayer url={url} onReady={handleEditSong} hidden />
		</div>
	);
}
