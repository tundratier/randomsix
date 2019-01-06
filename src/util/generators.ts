/**
 * Generator that returns an infinite amount of random items of a given array.
 * @param source - the array that holds all values
 */
export function* random<T>(source: Array<T>): Iterator<T> {
	while (true) {
		yield source[Math.floor(Math.random() * source.length)];
	}
}

export const PLAYLIST_SKIP = "skip";

/**
 * Generator that returns a random item of a list and then deletes the returned item.
 * This generator will run until all items of the given list have been supplied.
 * If the previously returned item should not be deleted this generator can be called with {@link PLAYLIST_SKIP}.
 * The item will then be available for re-selection.
 * @param source - the array that holds the initial values for the playlist
 */
export function* playlist<T>(source: Array<T>): Iterator<T> {
	let list = source.slice();
	while (list.length > 0) {
		let idx = Math.floor(Math.random() * list.length);
		let op = list[idx];
		let action = yield op;
		if (action !== PLAYLIST_SKIP) {
			list.splice(idx, 1);
		}
	}
}