/**
 * Validates if an array of numbers is sorted in ascending order.
 * Allows equal values (non-strict order).
 */
export function isAscendingSorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      console.warn(`Array not sorted at index ${i - 1} (${array[i - 1]}) > ${array[i]}`);
      return false;
    }
  }
  return true;
}


/**
 * Validates if an array of numbers is sorted in descending order.
 * Allows equal values (non-strict order).
 */
export function isDescendingSorted(array: number[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      console.warn(`Array not sorted at index ${i - 1} (${array[i - 1]}) < ${array[i]}`);
      return false;
    }
  }
  return true;
}
