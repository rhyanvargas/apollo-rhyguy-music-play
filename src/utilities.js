import { queueItemsVar } from "./graphql/cache";

export const storeQueueItemsInLocalStorage = async (keyString, dataValue) => {
	let queueArray = [];
	let localItem = await new Promise((resolve) =>
		resolve(localStorage.getItem(keyString))
	);

	// If local object exists,  clear localStorage
	if (localItem) localStorage.clear();

	// update new array by adding dataValue
	const stringifyData = JSON.stringify(dataValue);
	queueArray.push(stringifyData);

	// push new array to localStorage
	localStorage.setItem(keyString, JSON.stringify(queueArray));
};

export const addSongToQueue = (song) => {
	const addedSongQueue = [...queueItemsVar(), song];
	// Add song to queue
	queueItemsVar(addedSongQueue);
};

export const removeSongFromQueue = (song) => {
	const removedSongQueue = queueItemsVar().filter(
		(item) => item.id !== song.id
	);
	// Remove song from queue
	queueItemsVar(removedSongQueue);
};
