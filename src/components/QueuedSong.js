import { useMutation } from "@apollo/client";
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
import React from "react";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";
import {queueItemsVar} from '../graphql/cache'
import { GET_QUEUED_SONGS } from "../graphql/queries";

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
	// const [removeSongFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE)

	const handleRemoveFromQueue = () => {

		console.log('REMOVE ME HERE!');
	}

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
						secondaryTypographyProps={{noWrap: true}}
					/>
				</ListItem>
				<ListItemSecondaryAction>
					<IconButton onClick={handleRemoveFromQueue} edge="end" aria-label="delete">
						<Delete color="error" />
					</IconButton>
				</ListItemSecondaryAction>
			</List>
		</>
	);
}
