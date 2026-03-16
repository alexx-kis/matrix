# функция-конструктор

- это обычная функция, которую используют для создания объектов одного типа

- идея такая: мы пишем "шаблон", по которому можно создавать много одинаковых объектов

```js
const userOne = {
  name: 'Alex',
  age: 30,
};

const userTwo = {
  name: 'Kate',
  age: 25,
};
```

## как выглядит функция-конструктор

```js
function UserConstructor(userNameValue, userAgeValue) {
  this.name = userNameValue;
  this.age = userAgeValue;
}
```

- имя функции с большой буквы - это не правило, а конвенция, так разработчики понимают, что эту функцию нужно вызывать через `new`

- используется `this` - это означает записать свойства в создаваемый объект
- но сам объект мы не создаём вручную, это делает оператор `new`

## использование конструктора

```js
const userOne = new UserConstructor('Alex', 30);
const userTwo = new UserConstructor('Kate', 25);
```

### что делает `new`

- JS делает 4 шага:
  1. JS создаёт новый пустой объект

  ```js
  const newObjectExample = {};
  ```

  2. после этого JS вызывает функцию `UserConstructor("Alex", 30)`, но внутри функции есть `this`, который привязывается к этому новому объекту

  3. выполняется функция, примерно происходит так:

  ```js
  {}.name = 'Alex';
  {}.age = 30
  ```

  4. `new` автоматически возвращает объект

  ```js
  const userOne = new UserConstructor('Alex', 30);
  ```

  ```js
  const userOne = {
    name: 'Alex',
    age: 30,
  };
  ```

## вызов функции без `new`

- если вызвать функцию-конструктор без `new`, то всё зависит от режима JS

1. в обычном режиме (non-strict) `this` указывает на глобальный объект (в браузере это window)

```js
window.name = 'Alex';
window.age = 30;
```

- то есть мы случайно создадим глобальные переменные - это очень плохая практика

2. в строгом режиме (strict mode) `this` указывает на `undefined` и строка `this.name = userNameValue;` вызовет ошибку

```
TypeError: Cannot set property 'name' of undefined
```

## лайфхак

- иногда конструктор защищает от неправильного вызова

```js
function UserConstructor(userNameValue, userAgeValue) {
  if (!new.target) {
    return new UserConstructor(userNameValue, userAgeValue);
  }

  this.name = userNameValue;
  this.age = userAgeValue;
}
```

- `new.target` показывает, функция вызвана через `new` или нет

## внутри конструктора можно создавать методы объекта

```js
function AnimalConstructor(animalNameValue) {
  this.name = animalNameValue;

  this.sayName = function () {
    console.log(this.name);
  };
}

const animalOne = new AnimalConstructor('Tiger');
```

```js
{
  name: "Tiger",
  sayName: function
}
```

- но тут есть важная проблема - если создать 1000 объектов, то метод sayName создастся 1000 раз, это не эффективно по памяти

- решение: в JS есть механизм `prototype`, он позволяет хранить общие методы отдельно, а объекты будут брать их оттуда

```js
function AnimalConstructor(animalNameValue) {
  this.name = animalNameValue;
}

AnimalConstructor.prototype.sayName = function () {
  console.log(this.name);
};

const animalOne = new AnimalConstructor('Tiger');
const animalTwo = new AnimalConstructor('Lion');
```

- метод в памяти один, но оба объекта могут его вызвать. оба объекта ссылаются на один метод

- у каждой функции в JS есть свойство `prototype` и именно его использует оператор `new`

- при вызове метода объекта, который хранится в прототипе, алгоритм поиска свойства сначала ищет в самом объекте -> не находит -> идёт в прототип -> находит в прототипе -> вызывает функцию

- этот механизм называется prototype chain (прототипная цепочка) - это одна из самых фундаментальных вещей в JS

### правило

- в конструкторе хранят данные
- в prototype хранят методы

- это экономит память, потому что метод один для всех объектов
