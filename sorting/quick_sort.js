function quicksort(arr, low, high) {
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
  for (let j = low; j < high - 1; j++) {
    if (arr[j] < pivot) {
      // console.log("swap", pivot, arr[i], arr[j]);
      i++;
      swap(arr, i, j);
    }
  }
  console.log("mid1", arr);
  swap(arr, i + 1, high);
  console.log("mid2", arr);
  return i + 1;
}

function swap(arr, i, j) {
  console.log("swap", arr[i], arr[j]);
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [10, 80, 30, 90, 40, 50, 70];
const low = 0;
const high = arr.length - 1;
quicksort(arr, low, high);
console.log("final", arr);
