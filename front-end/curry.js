function curry(fn) {
  return function curried(...args) {
    // fn.length 返回需要科里化的方法的 arguments 的长度,
    // 如果不到这个长度，则说明需要继续接受参数，
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curried = curry(sum);

console.log("curried sum result", curried(1, 2, 3));
console.log("curried sum result", curried(1, 2)(3));
console.log("curried sum result", curried(1)(2)(3));

function sum2() {
  return Array.prototype.slice.apply(arguments).reduce((p, c) => {
    return p + c;
  }, 0);
}

console.log("sum2", sum2(1, 2, 3, 4));

function curry2(fn) {
  return function curried(...args) {
    // 累计保存的 arguments
    return function (...args2) {
      // 真正接受的 arguments
      if (!args2.length) {
        // 最后传的空，告知返回结果
        return fn.apply(this, args);
      } else {
        // 如果入参不为空， 则继续 concat，返回 curried 方法，等待下一次调用
        return curried.apply(this, args.concat(args2));
      }
    };
  };
}

const curried2 = curry2(sum2);

console.log("curried2 sum result", curried2(1)(2)(3)(4)());
