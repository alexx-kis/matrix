# array-like arguments

- arguments - это встроенный объект внутри обычной функции, который содержит все аргументы, переданные функции

## ключевые свойства `arguments`

1. array-like

- имеет числовые индексы (0, 1, 2)
- есть свойство `length`
- не является массивом, нет методов массива (map, forEach, filter, итд)

2. доступ к аргументам по индексам

```js
function greet() {
  console.log(arguments[0]); // первый аргумент
  console.log(arguments[1]); // второй аргумент
}

greet('Alex', 'Hello');
// Alex
// Hello
```

3. объект живой (live) - меняется при изменении параметров (для старых браузеров), но в современных JS это почти не заметно

## почему `arguments` - array-like

```js
function demo() {
  console.log(arguments.length); // есть длина
  console.log(arguments[0]); // можно обращаться по индексу
}

demo(10, 20, 30); // length: 3, аргументы по индексам

// ❌ но нельзя напрямую делать:
arguments.push(40); // TypeError: arguments.push is not a function
```

## преобразование `arguments` в массив

- чтобы использовать методы массивов, нужно превращать `arguments` в настоящий массив

```js
function sum() {
  const args = Array.from(arguments);
  return args.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// или

function sum() {
  const args = [...arguments];
  return args.reduce((a, b) => a + b, 0);
}

console.log(sum(5, 6, 7)); // 18
```

## отличие `arguments` от rest-параметров

- rest-параметры - это настоящий массив

```js
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3)); // 6
```

🔹 важные нюансы

1. в стрелочных функциях `arguments` не существует
2. для современного кода лучше использовать rest-параметры
3. arguments - полезен для функций с неизвестным количеством аргументов, особенно в старом коде

## использование arguments

- `arguments` нужен, чтобы функция могла получать и работать с любым количеством аргументов, даже если заранее мы не знаем, сколько их будет

- в классическом JS (до ES6) не было rest-параметров, поэтому `arguments` был единственным способом сделать `variadic functions` - функции с переменным количеством аргументов

### сумма любого числа аргументов

```js
function sumAll() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3, 4)); // 10
```

✅ без `arguments` нужно было бы писать `sum(a, b)` и каждый раз создавать новую функцию для другого числа аргументов

### функция% которая логирует все аргументы

```js
function logAll() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(`аргумент ${i}:`, arguments[i]);
  }
}

logAll('JS', 'HTML', 'CSS', 42);
// аргумент 0: JS
// аргумент 1: HTML
// аргумент 2: CSS
// аргумент 3: 42
```

🔹 можно передать сколько угодно данных, и функция с ними справится

### старый способ имитировать rest-параметры

- до ES6, чтобы принимать неопределённое количество аргументов и работать с методами массивов:

```js
function multiply() {
  const args = Array.from(arguments); // превращаем в массив
  return args.map((x) => x * 2);
}

console.log(multiply(1, 2, 3)); // [2, 4, 6]
```

## почему сегодня используют rest-параметры вместо `arguments`

- `arguments` не существует в стрелочных функциях
- это не массив -> нельзя сразу использовать методы массивов
- rest-параметры проще и нагляднее

```js
const multiply = (...numbers) => numbers.map((x) => x * 2);
console.log(multiply(1, 2, 3)); // [2, 4, 6]
```

✅ вывод:

- `arguments` нужен для функций с переменным количеством аргументов, чтобы их можно было обрабатывать без знания точного числа параметров
- сегодня чаще используют rest-параметры, но `arguments` всё ещё встречается в старом коде или библиотеках
