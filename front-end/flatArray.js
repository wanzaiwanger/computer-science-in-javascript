var arr = [1, [2, [3, 4]]];

function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
}

const final = flat(arr);
