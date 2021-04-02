function quicksort(arr, low, high) {
  if (arr.length <= 1) {
    return arr;
  }
  if (low < high) {
    //  pivot is partitioning index, arr[pivot] is now at right place
    const pi = partition(arr, low, high);
    quicksort(arr, low, pi - 1);
    quicksort(arr, pi + 1, high);
  }
  return arr;
}

/**
 *
 * @param {*} arr
 * @param {*} low
 * @param {*} high
 * @returns
 * This function takes last element as pivot, places
 * the pivot element at its correct position in sorted
 * array, and places all smaller (smaller than pivot)
 * to left of pivot and all greater elements to right
 * of pivot
 */
function partition(arr, low, high) {
  // pivot (Element to be placed at right position)
  const pivot = arr[high];
  // index of smaller element and indicates the
  // right position of pivot found so far
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

function swap(arr, i, j) {
  if (i === j) {
    return;
  }
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [10, 7, 8, 9, 1, 5];
const low = 0;
const high = arr.length - 1;
const sorted = quicksort(arr, low, high);
console.log("final", sorted);
