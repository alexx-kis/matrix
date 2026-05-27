# способы привязать `this` к функции

- при вызове функции, значение `this` не фиксировано заранее - оно определяется способом вызова функции
- поэтому иногда нужно принудительно привязать `this` к конкретному объекту

## основные способы привязки `this`:
1. обычный вызов (без привязки)
2. через метод объекта
3. явная привязка `call`, `apply`, `bind`
4. через `new`

## 1. обычный вызов функции

```js
function showNameExample() {
  console.log(this);
}

showNameExample();
```

- в не `strict mode` -> `this === window`
- в `strict mode` -> `this === undefined`
- потому что функция вызвана сама по себе, без объекта

## 2. Вызов как метод объекта

```js
const userProfile = {
  name: 'Alex',
  showNameExample() {
    console.log(this.name);
  }
};

userProfile.showNameExample(); // 'Alex'
```

- потому что `this` ссылается на объект `userProfile`
✔️ `this` - объект слева от точки при вызове функции (метода)

⚠️ Потеря `this`

```js
const extractedFunction = userProfile.showNameExample;
extractedFunction();
```

- потому что функция оторвалась от объекта

## 3. явная привязка `this`

### `call`
- вызывает функцию сразу и задаёт `this`

```js
function greetUserExample(cityName) {
  console.log(this.name, cityName)
}

const personOneExample = { name: 'Alex' };

greetUserExample.call(personOneExample, 'Amsterdam'); // 'Alex' 'Amsterdam'
```

- метод `call` принимает параметры: объект, к которому привязывается `this` и аргументы функции

### `apply`
- то же самое, но аргументы передаются в виде массивы

```js
greetUserExample.apply(personOneExample, ['Berlin']);
```

### `bind`

- не вызывает функцию сразу
- возвращает новую функцию с привязанным `this`

```js
const boundGreetFunction = greetUserExample.bind(personOneExample);

boundGreetFunction('Paris'); // 'Alex' 'Paris'
```

### почему `bind` важен?

- потому что он решает проблему потери `this`

```js
const userExampleTwo = {
  name: 'Kate',
  sayNameExample() {
    console.log(this.name);
  }
};

const safeFunction = userExampleTwo.sayNameExample.bind(userExampleTwo);

safeFunction(); // Kate
```

## 4. привязка через `new`

```js
function UserConstructorExample(nameValue) {
  this.name = nameValue;
}

const userInstance = new UserConstructorExample('Alex');
```
- здесь `this` автоматически указывает на новый объект

## приоритет `this`

- есть несколько вариантов - работает правило приоритета:
  1. `new`
  2. `bind`
  3. `call / apply`
  4. обычный вызов

⚠️ нюанс

- `bind` нельзя перебить

```js
const boundFunctionExample = greetUserExample.bind({ name: 'Alex' });

boundFunctionExample.call({ name: 'Kate' }); // 'Alex'
```

- потому что `bind` фиксирует `this` навсегда