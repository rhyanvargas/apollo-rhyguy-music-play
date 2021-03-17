import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useContext } from "react";
import { SongContext } from "../App";
import { ACTION_TYPES } from "../reducer";
import { removeSongFromQueue } from "../utilities";

const useStyles = makeStyles({
	container: {
		display: "flex",
		justifyContent: "space-between",
	},
	imageWrapper: {},
	content: {},
	iconWrapper: {},
});

export default function QueuedSong({ song }) {
	const { title, artist, thumbnail } = song;
	const classes = useStyles();
	const { container } = classes;
	const { dispatch } = useContext(SongContext);

	const handleRemoveFromQueue = () => {
		dispatch({ type: ACTION_TYPES.REMOVE_FROM_QUEUE, payload: { song } });
	};

	return (
		<>
			<List dense className={container}>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<img src={thumbnail} alt={title} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={title}
						secondary={artist}
						secondaryTypographyProps={{ noWrap: true }}
					/>
				</ListItem>
				<ListItemSecondaryAction>
					<IconButton
						onClick={handleRemoveFromQueue}
						edge="end"
						aria-label="delete"
					>
						<Delete color="error" />
					</IconButton>
				</ListItemSecondaryAction>
			</List>
		</>
	);
}
