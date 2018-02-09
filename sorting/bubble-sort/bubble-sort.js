function swap(items, firstIndex, secondIndex) {
  const tempItem = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = tempItem;
}

/**
 * In-place sort array, index count up from head to tail.
 * @param {*} arr An array of items needs to be sorted.
 */
function bubbleSort(arr) {

  const len = arr.length;
  const stop = len - 1;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < stop; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;

}


/**
 * In-place sort array. Use two reversed loops count down from tail to head.
 * @param {*} arr An array of items needs to be sorted.
 */
function bubbleSort2(arr) {

  const len = arr.length;

  for (let i = len - 1; i > 0; i--) {
    for (let j = len - 1; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        console.log(arr[j], arr[j - 1])
        swap(arr, j, j - 1);
      }
    }
  }

  return arr;

}

console.log(bubbleSort([1, 3, 2, 4, 9, 8, 2, 6, 7]))  // [ 1, 2, 2, 3, 4, 6, 7, 8, 9 ]
console.log(bubbleSort2([1, 3, 2, 4, 9, 8, 2, 6, 7]))