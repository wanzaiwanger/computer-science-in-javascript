function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * In-place sort array, index count up from head to tail.
 * @param {*} arr An array of items needs to be sorted.
 * O(n*n)
 */
function bubbleSort(arr) {
  // 外层i遍历全部，每一轮会把最大的数字移到队尾
  for (let i = 0; i < arr.length - 1; i++) {
    // 内层 j 不用到最后，last i elements are already in place
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

console.log(bubbleSort([1, 3, 2, 4, 9, 8, 2, 6, 7, 1]));
