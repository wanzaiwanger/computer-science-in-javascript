function timer(time) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time * 500);
  });
  // 返回id主要是想打印出来看当前是哪一个
  return {
    id: time,
    task: p,
  };
}

function batchLimit(arr, concurrent) {
  const resolvedArr = [];
  const len = arr.length;

  return new Promise((resolve, reject) => {
    let index = 0;

    function enqueue() {
      const cur = arr.shift();
      // 不能在这里自增
      // index++;
      // 当cur 已经是undefined的时候，index 还是小于len的
      if (cur && index <= len) {
        console.log('get a new one', cur, index);
        cur.task
          .then((res) => {
            console.log('finished ', res, index, len);
            resolvedArr[index] = res;
            index++;
            if (index === len) {
              console.log('all done', index, len);
              resolve(resolvedArr);
            } else {
              enqueue();
            }
          })
          .catch((err) => {
            resolvedArr[index] = err;
            enqueue();
          });
      }
    }

    for (let i = 0; i < concurrent; i++) {
      enqueue();
    }
  });
}

const arr = [
  // timer(15),
  // timer(14),
  // timer(13),
  // timer(15),
  // timer(14),
  // timer(13),
  // timer(15),
  // timer(14),
  // timer(13),
  // timer(12),
  // timer(11),
  timer(10),
  timer(9),
  timer(8),
  timer(7),
  timer(6),
  timer(5),
  timer(4),
  timer(3),
  timer(2),
  timer(1),
  // timer(15),
  // timer(14),
  // timer(13),
];

batchLimit(arr, 2).then((res) => {
  console.log('batch', res);
});
