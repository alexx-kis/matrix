# получение конструктора через прототип

- у каждого объекта можно добраться до его конструктора через:

```js
obj.__proto__.constructor;
// или
Object.getPrototypeOf(obj).constructor;
```

### пример

```js
function UserConstructor(name) {
  this.name = name;
}

const userInstance = new UserConstructor('Alex');

console.log(userInstance.constructor === UserConstructor); // true
```

- это работает, потому что

```js
UserConstructor.prototype.constructor === UserConstructor;
```

```
userInstance
   ↓ __proto__
UserConstructor.prototype
   ↓
constructor → UserConstructor
```

## откуда берётся конструктор

- по умолчанию JS создаёт:

```js
UserConstructor.prototype = {
  constructor: UserConstructor,
};
```

## важный момент

- если перезаписать prototype

```js
function A() {}

A.prototype = {
  sayHi() {
    console.log('hi');
  },
};

// теперь

const obj = new A();

console.log(obj.constructor === A); // false

// потому что

A.prototype.constructor !== A;

// он теперь указывает на

Object;
```

- как правильно исправить

```js
A.prototype = {
  constructor: A,
  sayHi() {
    console.log('hi');
  },
};

// теперь

obj.constructor === A; // true
```

## практическое применение

- иногда используют так:

```js
const obj = new UserConstructor('Alex');

const newObj = new obj.constructor('Kate');
```

- создаётся объект того же типа

## но это не всегда безопасно

- если constructor сломан - будет баг

## встроенные объекты

```js
const arr = [];

console.log(arr.constructor === Array); //true

// потому что

arr -> Array.prototype -> constructor -> Array
```


## итог

- чтобы получить конструктор:

```js
obj.constructor
```

- но это работает корректно, только если

```js
prototype.constructor не сломан
```

## 🧠 Как сказать на собеседовании

- "Свойство constructor находится в prototype и указывает на функцию-конструктор, создавшую объект. Однако оно может быть потеряно при переприсваивании prototype, поэтому его нельзя всегда считать надёжным."