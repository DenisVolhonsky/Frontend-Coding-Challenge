/**
 * Generates a random integer array of length n respecting the borders min and max.
 *
 * @param min smallest potential number in the array
 * @param max largest potential number in the array
 * @param n number of lements
 */
export function randomIntArrayInRange(
  min: number,
  max: number,
  n = 10,
): number[] {
  return Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
}

/**
 * Randomizes the order of the elements inside a number array
 *
 * @param array array to be shuffled
 */
export function shuffle(array: number[]): number[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
