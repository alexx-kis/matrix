# каррирование

- это техника преобразования функции, которая превращает функцию `f(a, b, c)` в `f(a)(b)(c)`
- то есть вместо одной функции с несколькими аргументами мы получаем цепочку функций по одному аргументу

```js
function sumThreeNumbers(valueOne, valueTwo, valueThree) {
  return valueOne + valueTwo + valueThree;
}

const resultValue = sumThreeNumbers(1, 2, 3);

console.log(resultValue); // 6
```

- функция получает 3 аргумента сразу

- каррированная версия

```js
function sumThreeNumbersCurried(valueOne) {
  return function secondFunction(valueTwo) {
    return function thirdFunction(valueThree) {
      return valueOne + valueTwo + valueThree;
    };
  };
}

const resultCurried = sumThreeNumbersCurried(1)(2)(3);

console.log(resultCurried); // 6
```

- теперь вызов происходит поэтапно

## как это работает

```js
sumThreeNumbersCurried(1)(2)(3);
```

### шаг 1

```js
sumThreeNumbersCurried(1);
```

- возвращает:

```js
function secondFunction(valueTwo) { ... }
```

### шаг 2

```js
secondFunction(2);
```

- возвращает:

```js
function thirdFunction(valueThree) { ... }
```

### шаг 3

```js
thirdFunction(3);
```

- возвращает результат: 6

## почему это работает

- это возможно благодаря замыканиям
- каждая функция запоминает переменные внешней функции

```
valueOne = 1
valueTwo = 2
valueThree = 3
```

- даже когда функция уже вернулась - значения сохраняются в замыкании

## более простой пример

- допустим есть обычная функция:

```js
function multiplyNumbers(numberOne, numberTwo) {
  return numberOne * numberTwo;
}

multiplyNumbers(5, 4); // 20
```

- каррированная версия:

```js
function multiplyNumbersCurried(numberOne) {
  return function innerMultiply(numberTwo) {
    return numberOne * numberTwo;
  };
}

// использование:

const multiplyByFive = multiplyNumbersCurried(5);

const resultMultiply = multiplyByFive(4);

console.log(resultMultiply); // 20
```

## главное преимущество - частичное применение (partial application)

- теперь можно создавать специализированные функции

```js
const multiplyByTen = multiplyNumbersCurried(10);

console.log(multiplyByTen(3)); // 30
console.log(multiplyByTen(7)); // 70
```

- мы зафиксировали первый аргумент

## почему это полезно

- currying позволяет:
  1. переиспользовать функции

  ```js
  const addTax = calculatePriceCurried(0.21);
  ```

  2. делать код функциональным (это популярно в функциональном программировании)
  3. создавать конфигурируемые функции (сначала передаём настройки, потом данные)

## часто используемый паттерн

```js
function createLogger(logPrefix) {
  return function logMessage(logText) {
    console.log(logPrefix + logText);
  };
}

const errorLogger = createLogger('ERROR: ');
const infoLogger = createLogger('INFO: ');

errorLogger('File not found'); // 'ERROR: File not found'
infoLogger('Server started'); // 'INFO: Server started'
```

