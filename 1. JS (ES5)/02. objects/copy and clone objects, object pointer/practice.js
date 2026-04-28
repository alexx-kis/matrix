// 1
let a = { value: 5 };
let b = a;
b.value = 10;

console.log(a.value); // 10
// потому что переменные a и b ссылаются на один и тот же объект { value: 5 }

// 2
let user = { name: "Alex" };
let admin = user;

admin.name = "John";

console.log(user.name); // John
// потому что переменные user и admin ссылаются на один и тот же объект { name: "Alex" };

// 3
let user2 = { name: "Alex" };
let admin2 = user;

admin2 = { name: "John" };

console.log(user2.name); // Alex
// потому что сначала в переменную admin записывается ссылка на объект { name: "Alex" }, а потом записывается ссылка на объект { name: "John" };

// 4 копирование

let user3 = {
  name: 'Alex',
  address: {
    city: 'NY'
  }
};

let copy = { ...user };

copy.address.city = 'LA';

console.log(user.address.city) // LA, потому что при поверхностном копировании копируются значения примитивных свойств, а вложенные объекты копируются по ссылке. то есть свойство address в обоих объектах ссылается на один и тот же объект { city: "NY" }