# лексическое окружение

- это специальный объект, в котором JS хранит переменные, функции, аргументы функций + ссылку на внешнее окружение

- каждый раз, когда создаётся скрипт, функция, блок {}, создаётся своё хранилище переменных - лексическое окружение

## структура лексического окружения

1. environment record
  - тут лежат переменные
  ```js
  let cityName = 'Amsterdam'
  let countValue = 10;
  ```

  - внутри окружения это выглядит примерно так:
  ```
  environment record%
  {
    cityName: 'Amsterdam',
    countValue: 10,
  }
  ```

2. outer (ссылка на внешнее окружение)
  - Outer -> внешнее lexical environment


## пример вложенности

```js
let globalValue = 1;

function printValue() {
  let innerValue = 2;
  console.log(globalValue)
}
```

- что происходит:

1. глобальное окружение

```
Lexical Environment (Global):
{
  globalValue: 1,
  printValue: function
}
Outer: null
```

2. при вызове функции `printValue()` создаётся ещё одно новое окружение:

```
Lexical Environment (printValue):
{
  innerValue: 2
}
Outer -> Global Environment
```

## как ищутся переменные

- когда JS видит

```js
console.log(globalValue);
```
1. он сначала ищет в текущем окружении (printValue) -> не находит
2. идёт в глобальное окружение (Outer) -> нашёл

- это называется `scope chain` (цепочка областей видимости)

# 📌 ВАЖНО: почему это "lexical"

- потому что окружение определяется в момент написания кода, а не выполнения

```js
function firstFunction() {
  let valueA = 10;

  function secondFunction() {
    console.log(valueA);
  }

  return secondFunction;
}
```
- `secondFunction` знает, где искать `valueA` ещё до вызова


## 🧩 ключевая идея

- каждая функция запоминает своё окружение при создании -> это приводит нас к теме `замыкания`


## ⚠️ частые ошибки понимания

❌ 1. "переменные копируется" -> нет, они не копируется, а ищутся через ссылку `Outer`
❌ 2. "функция берёт переменные из места вызова" -> нет, функция берёт их из места объявления

```js
let valueX = 1;

function testFunction() {
  console.log(valueX);
}

function wrapperFunction() {
  let valueX = 2;
  testFunction();
}

wrapperFunction(); // 1
```

- `testFunction` создана в глобальном окружении, значит, её `Outer` -> глобальный scope

# прикол

- при копировании функции (по ссылке) лексическое окружение тоже передаётся (то же)

```js
function createCounter() {
  let countValue = 0;

  return function () {
    countValue++;
    console.log(countValue);
  };
}

let counterA = createCounter();
let counterB = createCounter();

counterA();
counterA();
counterB();
counterA();
```

```js
let counterC = counterA;
counterC(); // <- та же самая функция, то есть лексическое окружение то же. то есть этот вызов - то же самое, что и вызов counterA()
```
