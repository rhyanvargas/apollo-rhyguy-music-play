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

export default function QueuedSong({ song }) {
	const { state, dispatch } = useContext(SongContext);
	const { title, artist, thumbnail } = song;

	const useStyles = makeStyles(theme => ({
		container: {
			display: "flex",
			justifyContent: "space-between",
		},
		imageWrapper: {},

		iconWrapper: {},
	}));
	const classes = useStyles();
	const { container,  } = classes;

	const handleRemoveFromQueue = () => {
		dispatch({ type: ACTION_TYPES.REMOVE_FROM_QUEUE, payload: { song } });
	};

	return (
		<>
			<List dense className={container}>
				<ListItem >
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
