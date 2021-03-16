import { Typography } from "@material-ui/core";
import { React, useEffect, useState } from "react";
import QueuedSong from "./QueuedSong";
import { queueItemsVar } from "../graphql/cache";
import {GET_QUEUED_SONGS} from '../graphql/queries'
import {ADD_OR_REMOVE_FROM_QUEUE} from '../graphql/mutations'
import { useMutation } from "@apollo/client";


export default function QueuedSongList({queue}) {
	
	return (
		<div>
			<Typography color="textSecondary" variant="button">
				QUEUE({queue?.length})
				{/* {queueItemsVar() && queueItemsVar().length || JSON.parse(JSON.parse(localStorage.getItem('queue'))).length} */}
			</Typography>
			{queue &&
				queue.map((song, i) => (
					<QueuedSong key={song.id} song={song} />
				))
			}
		</div>
	);
}
