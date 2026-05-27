# типы функций

- в JS функция - это объект, который можно:
  - создавать
  - передавать
  - хранить в переменных
  - вызывать

- создавать функции можно разными способами:
  - Function Declaration
  - Function Expression
  - Arrow Function
  - Method (функция внутри объекта)
  - Constructor Function

## 1. Function Declaration

- самый классический способ

```js
function calculateSum(a, b) {
  return a + b;
}

calculateSum(2, 3); // 5
```

- `function` - ключевое слово создания функции
- `calculateSum` - имя функции
- `(a, b)` - параметры
- `{}` - тело функции

### главная особенность - Hoisting

- Function Declaration можно вызывать до объявления

```js
showGreeting(); // 'hello'

function showGreeting() {
  console.log('hello');
}
```

- работает, потому что JS поднимает объявление функции в начало области видимости

## 2. Function Expression

- функция может быть значением переменной

```js
const multiplyNumbers = function (x, y) {
  return x * y;
};

multiplyNumbers(4, 5); //20
```

- что происходит:
  1. создаётся анонимная функция
  2. она присваивается в переменную

### важная разница с Function Declaration

- Function Expression не hoist-ится, потому что переменная ещё не инициализирована

## Named Function Expression

- Function Expression может иметь имя:

```js
const factorialValue = function factorialInternal(n) {
  if (n === 1) return 1;
  return n * factorialInternal(n - 1);
};
```

- имя `factorialInternal`:
  - доступно только внутри функции
  - полезно для рекурсии

## 3. Arrow Function

- современный синтаксис (ES6)

```js
const divideNumbers = (a, b) => {
  return a / b;
};

const squareValue = (number) => number * number;
```

### особенности

1. нет собственного `this`
2. нет `arguments`

✅ arguments — это псевдомассив всех переданных аргументов

- в обычной функции JavaScript автоматически создаёт объект arguments

```js
function showArgumentsExample() {
  console.log(arguments);
}

showArgumentsExample(10, 20, 30); // {0: 10, 1: 20, 2: 30}
```

3. нельзя использовать, как конструктор
4. всегда Function Expression

## 4. Method (метод объекта)

- функция внутри объекта называется `метод`

```js
const calculateObject = {
  numberValue: 10,
  showNumber() {
    console.log(this.numberValue);
  },
};

calculateObject.showNumber(); // 10
```

## 5. Constructor Function

- функция может создавать объекты

```js
function PersonCreator(nameValue) {
  this.name = nameValue;
}

const personInstance = new PersonCreator('Alex');
```

- `new`:

1. создаёт объект
2. устанавливает `this`
3. возвращает объект

- это старый способ создания классов до `class`
