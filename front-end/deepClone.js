// var arr = [
//   "str",
//   1,
//   true,
//   ["old1", "old2"],
//   { old: 1 },
//   function () {
//     console.log(a);
//   },
//   {
//     b: function () {
//       console.log(b);
//     },
//   },
// ];

// function will transfer to null and
// function in key-value will transfer to {}
// circular reference will throw type error
// var newArr = JSON.parse(JSON.stringify(arr));

function clone(obj) {
  if (typeof obj !== "object") {
    return obj;
  }
  var newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    // key in object is obj property while in array is index
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function cloneDeep(obj, cache) {
  // for primitive just return itself
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // cache 用来处理 circular reference
  // void 0 就是 undefined，觉得酷一点，现代浏览器应该直接使用 undefined
  if (cache === void 0) {
    cache = [];
  }

  // 检查 cache 中是否有当前对象，如果有，直接返回，不再递归进入
  const exist = find(cache, obj);
  if (exist) {
    return exist.copy;
  }

  var newObj = obj instanceof Array ? [] : {};

  cache.push({
    origin: obj,
    copy: newObj,
  });

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      newObj[key] = typeof val === "object" ? cloneDeep(val, cache) : val;
    }
  }
  return newObj;
}

function find(cache, obj) {
  return cache.filter((c) => {
    // 为什么可以直接用 strict equal ，
    // 因为 push 时保存的也是 reference
    return c.origin === obj;
  })[0];
}

const o1 = { x: ["old"] };
const o2 = { y: ["old"] };

// copy 之后 修改 reference 观察打印结果
const c1 = clone(o1);
const c2 = cloneDeep(o1);

o1.x[0] = "new";

// 检查循环引用
o1.next = o2;
o2.next = o1;

// JSON.parse(JSON.stringify(o1));
const c3 = clone(o1);
const c4 = cloneDeep(o1);
