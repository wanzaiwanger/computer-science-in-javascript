function objectFactory() {
  // 先生成一个空对象实例
  const obj = new Object();

  // 拿到第一个参数，就是传入的构造函数
  const Constructor = [].shift.call(arguments);

  // 将obj的原型指向构造函数，这样才可以访问 constructor prototype上的方法，
  obj.__proto__ = Constructor.prototype;

  // 改变this指向，指向新创建的obj，传入被shift掉第一个参数的arguments
  // 判断构造函数的返回类型，如果是对象
  const ret = Constructor.apply(obj, arguments);

  // 如果构造函数返回是个Object，则返回ret，例如24行；
  // 如果返回值是 null,string,undefined,number,boolean,symbol,bigInt,如30行，则继续返回对象实例
  return typeof ret === 'object' ? ret : obj;
}

function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;

  return {
    name,
    age,
    sex,
  };
  // return 'hi there';
}

Person.prototype.sayName = function () {
  console.log('my name is', this.name);
};

const p = objectFactory(Person, 'mike', 18, 'male');

p.sayName();
