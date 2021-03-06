import { useSubscription } from "@apollo/react-hooks";
import Song from "./Song";
import React from "react";
import { GET_SONGS } from "../graphql/subscriptions";
import { CircularProgress } from "@material-ui/core";

export default function SongList() {
	const { data, loading, error } = useSubscription(GET_SONGS);

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
		console.error(error);
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
