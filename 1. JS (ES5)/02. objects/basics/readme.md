# объекты

- объект - это коллекция свойств (properties), где каждое свойство состоит из ключа (key) и значения (value)
- ключи - обычно строки или символы, значения - любые типы данных, включая функции (тогда это называется "методом" объекта)

```js
const person = {
  name: 'Alice', // ключ "name", значение "Alice"
  age: 30, // ключ "age", значение 30
  greet: function () {
    // метод объекта
    console.log(`Hello, my name is ${this.name}`);
  },
};

console.log(person.name); // Alice
person.greet(); // Hello, my name is Alice
```

## 2️⃣ добавление/изменение/получение/удаление свойств

### 🔹 добавление или изменение свойства

- можно через точечную нотацию или квадратные скобки:

```js
const object = {};

object.color = 'red';
object['size'] = 42;

console.log(object); // {color: 'red', size: 42}
```

### 🔹 получение значения свойства

- так же через точечную нотацию или квадратные скобки

```js
console.log(object.color); // red
console.log(object['size']); // 42
```

### 🔹 удаление свойства

- для этого используется оператор `delete`

```js
delete object.size;

console.log(object); // {color: 'red'}
```

### 🔹 методы объекта

- метод - это функция внутри объекта

```js
const car = {
  brand: 'Toyota',
  drive() {
    console.log(`${this.brand} is driving`);
  },
};

car.drive(); // Toyota is driving
```

- можно динамически добавить метод:

```js
car.stop = function () {
  console.log(`${this.brand} stopped`);
};

car.stop();
```

## 3️⃣ получение свойств объекта

- `Object` - это встроенный (глобальный) конструктор для всех объектов
- это класс, от которого создаются объекты, и одновременно набор методов для работы с объектами

🔹 `Object.keys()` возвращает массив ключей:

```js
const user = { name: 'Bob', age: 25 };
console.log(Object.keys(user)); // ["name", "age"]
```

🔹 `Object.values()` возвращает массив значений:

```js
console.log(Object.values(user)); // ["Bob", 25]
```

🔹 `Object.entries()` возвращает массив массивов пар ключ-значение

```js
console.log(Object.entries(user)); // [["name","Bob"],["age",25]]
```

## 4️⃣ цикл `for...in`

- позволяет перебрать все перечисляемые свойства объекта по ключам

```js
const fruit = {
  apple: 3,
  banana: 5,
  cherry: 7,
};

for (const key in fruit) {
  console.log(key, fruit[key]);
}

// apple 3
// banana 5
// cherry 7
```

⚠️ `for...in` перебирает только собственные и унаследованные перечисляемые свойства. если нужны только свои свойства, используют `obj.hasOwnProperty(key)`

```js
for (let key in fruit) {
  if (fruit.hasOwnProperty(key)) {
    console.log(key, fruit[key]);
  }
}
```

5️⃣ способы создания объекта

1. литерал объекта `{}`

```js
const obj = { a: 1, b: 2 };
```

2. используя конструктор объектов `Object`

```js
const obj = new Object();

obj.a = 1;
obj.b = 2;
```

3. с помощью метода `create` конструктора `Object`

- он создаёт объект с указанным прототипом

```js
const proto = {
  greet() {
    console.log('hi!');
  },
};

const obj = Object.create(proto);
obj.name = 'Charlie';
obj.greet(); // hi!
```

4. через конструктор функции

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`Hello, I\'m ${this.name}`);
  };
}

const person = new Person('Dana', 28);

person.sayHello();
```

5. через класс

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  speak() {
    console.log(`${this.type} makes a sound`);
  }
}

const dog = new Animal('dog');

dog.speak(); // dog makes a sound
```
