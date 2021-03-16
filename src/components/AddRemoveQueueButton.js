import { useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { useState } from "react";
import { queueItemsVar } from "../graphql/cache";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";


const AddRemoveQueueButton = ({ song }) => {
	const [isInQueue, toggleQueueItem] = useState(false);
	const [addOrRemoveFromQueue, { loading, error }] = useMutation(
		ADD_OR_REMOVE_FROM_QUEUE
	);

	if (loading) console.log("updating queue...");
	if (error) console.error("Error Updating queue...", error);

	const handleToggleClick = async () => {
		const removedSongQueue = queueItemsVar().filter((item) => item.id !== song.id);
		const addedSongQueue = [...queueItemsVar(), song]

		// Update the cache
		queueItemsVar(
			isInQueue
				? removedSongQueue
				: addedSongQueue
		);

		toggleQueueItem(!isInQueue);
		alert(`${song.title} added to the Queue!`);
	};

	return (
		<IconButton
			onClick={handleToggleClick}
			size="small"
			color="secondary"
			disabled={isInQueue}
		>
			<Save />
		</IconButton>
	);
};

export default AddRemoveQueueButton;