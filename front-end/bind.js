console.log("第1种实现");

// 不支持 `new (funcA.bind(thisArg, args))`
Function.prototype.myBind = function () {
  let slice = Array.prototype.slice;
  let thatFunc = this;
  let thatArg = arguments[0];
  // 剩余的入参
  let args = slice.call(arguments, 1);

  if (typeof thatFunc !== "function") {
    throw new TypeError(
      "Function.prototype.bind - " +
        "what is trying to be bound is not callable"
    );
  }
  return function () {
    let funcArgs = args.concat(slice.call(arguments));

    return thatFunc.apply(thatArg, funcArgs);
  };
};

var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo = bar.bind(foo, "daisy");
bindFoo("18");
// 1
// daisy
// 18

console.log("第2种实现");

// work with `new (funcA.bind(thisArg, args))`
Function.prototype.newBind = function () {
  let slice = Array.prototype.slice;
  let thatFunc = this;
  let thatArg = arguments[0];
  let args = slice.call(arguments, 1);

  if (typeof thatFunc !== "function") {
    throw new TypeError(
      "Function.prototype.bind - " +
        "what is trying to be bound is not callable"
    );
  }

  let fNOP = function () {};

  let fBound = function () {
    let bindArgs = slice.call(arguments);

    return thatFunc.apply(
      this instanceof fNOP ? this : thatArg,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

// test

var foo = {
  value: 1,
};

function bar(name, age) {
  this.habit = "singing";
  console.log("value", this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "kevin";

// var bindFoo = bar.bind(foo, "daisy");
// var bindFoo = bar.myBind(foo, "daisy");
var bindFoo = bar.newBind(foo, "daisy");
var obj = new bindFoo("18");
// 当 bind 返回函数作为构造函数时，bind 指定的 this 值会失效，但是传入的参数依然生效。
// undefined
// daisy
// 18

// 尽管在全局和 foo 中声明了 value 值，但是最后依然返回了 undefined， 说明绑定的 this 失效了。这个时候 this 指向了 obj
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin

// 根据 mdn 文档的解释，第一种更简短，性能更好，不支持 new 操作。第二种复杂，性能次之，但是支持 new 操作。
// 通常说来，在bound 函数上使用 new 十分罕见，所以通常最佳实践是使用第一种实现方式。
// Generally, in most code it's very rare to see new used on a bound function,
// so it is generally best to go with the first option.

// 
/**
 * reference
 * 1. https://github.com/mqyqingfeng/Blog/issues/12
 * 2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */
