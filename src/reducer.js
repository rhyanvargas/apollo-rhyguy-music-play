import { addSongToQueue, removeSongFromQueue } from "./utilities";

export const ACTION_TYPES = {
	PLAY_SONG: "PLAY_SONG",
	PAUSE_SONG: "PAUSE_SONG",
	SET_SONG: "SET_SONG",
	REMOVE_FROM_QUEUE: "REMOVE_FROM_QUEUE",
	ADD_TO_QUEUE: "ADD_TO_QUEUE",
};

const songReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.PLAY_SONG: {
			return {
				...state,
				isPlaying: true,
			};
		}

		case ACTION_TYPES.PAUSE_SONG: {
			return {
				...state,
				isPlaying: false,
			};
		}

		case ACTION_TYPES.SET_SONG: {
			return {
				...state,
				song: action.payload.song,
			};
		}

		case ACTION_TYPES.REMOVE_FROM_QUEUE: {
			removeSongFromQueue(action.payload.song);
			return {
				...state,
				isInQueue: false,
			};
		}

		case ACTION_TYPES.ADD_TO_QUEUE: {
			addSongToQueue(action.payload.song);
			return {
				...state,
				isInQueue: true,
			};
		}

		default:
			return state;
	}
};

export default songReducer;
