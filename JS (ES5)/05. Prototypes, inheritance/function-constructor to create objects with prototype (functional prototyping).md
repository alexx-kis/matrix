# функция-конструктор для создания объектов с прототипами (функциональное прототипирование)

- суть темы: как через функцию-конструктор настраивается прототип и наследование поведения

## 1. главная идея

- при использовании функции-конструктора

```js
function UserConstructor(name) {
  this.name = name;
}
```

- у неё есть

```js
UserConstructor.prototype;
```

- и самое главное

```js
const userInstance = new UserConstructor('Alex');

userInstance.__proto__ === UserConstructor.prototype; // true
```

## 2. где находятся методы

- добавление методов

```js
UserConstructor.prototype.sayHi = function () {
  console.log(this.name);
};
```

- метод не копируется в объект, он лежит здесь:

```js
UserConstructor.prototype;
```

- вызов:

```js
userInstance.sayHi();
```

- JS делает:
  1. ищет в `userInstance` -> не находит
  2. ищет в `UserConstructor.prototype` -> находит

- это и есть functional prototyping - поведение задаётся через `prototype` функции

## 3. почему это важно

- все объекты, созданные через конструктор:

```js
const userA = new UserConstructor('Alex');
const userB = new UserConstructor('Kate');
```

- они делят один и тот же метод:

```js
userA.sayHi === userB.sayHi; // true
```

- потому что оба ссылаются на один `prototype`

## 4. изменение prototype

- если изменить `prototype` после

```js
function CarConstructor() {}

const carInstance = new CarConstructor();

CarConstructor.prototype.drive = function () {
  console.log('drive');
};

carInstance.drive(); // 'drive'
```

- то это сработает, потому что

```js
carInstance.__proto__; // - это ссылка, а не копия
```

## 5. опасный кейс - полная замена prototype

```js
function AnimalConstructor() {}

const animalInstance = new AnimalConstructor();

AnimalConstructor.prototype = {
  makeSound() {
    console.log('sound');
  },
};

animalInstance.makeSound(); // ошибка, потому что animalInstance.__proto__ указывает на старый prototype
```

### вывод

- менять можно, но не стóит заменять

## 6. наследование через function constructors

- базовый конструктор

```js
function AnimalBase(type) {
  this.type = type;
}

AnimalBase.prototype.makeSound = function () {
  console.log('sound');
};
```

- наследник:

```js
function DogConstructor(type) {
  AnimalBase.call(this, type);
}
```

- связываем prototype

```js
DogConstructor.prototype = Object.create(AnimalBase.prototype);
DogConstructor.prototype.constructor = DogConstructor;
```

- добавляем метод

```js
DogConstructor.prototype.bark = function () {
  console.log('woof');
};
```

- что получилось:

```
dogInstance
    ↓
DogConstructor.prototype
    ↓
AnimalBase.prototype
```

## 7. суть functional prototyping - 3 шага:

1. конструктор создаёт данные (`this`)
2. `prototype` хранит методы
3. все объекты делят один prototype

### задача

```js
function A() {}

A.prototype.sayHi = function () {
  console.log('hi');
};

const obj1 = new A();

A.prototype = {
  sayHi() {
    console.log('hello');
  },
};

const obj2 = new A();

obj1.sayHi(); // ?
obj2.sayHi(); // ?
```

- obj1 → старый prototype → sayHi: "hi"
- obj2 → новый prototype → sayHi: "hello"

- то есть у obj1 навсегда останется старый прототип, а у obj2 уже будет новый
- у каждого объекта прототип фиксируется в момент создания (new)

🔥 Итог, который ты должен держать в голове

- 👉 prototype — это объект
- 👉 объекты хранят ссылку на него
- 👉 если объект меняется → все видят изменения
- 👉 если ссылка меняется → старые объекты не знают об этом
