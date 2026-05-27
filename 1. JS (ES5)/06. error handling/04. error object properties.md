# свойства объекта `Error`

## основные свойства `Error`

1. `name` - тип ошибки

```js
try {
  throw new Error('fail');
} catch (errorObj) {
  console.log(errorObj.name); // Error
}
```

2. `message` - текст ошибки

```js
try {
  throw new Error('Something broke');
} catch (errorObj) {
  console.log(errorObj.message); // 'Something broke'
}
```

3. `stack` - стек вызовов (где произошла ошибка)

```js
function levelOne() {
  levelTwo();
}

function levelTwo() {
  throw new Error('fail');
}

try {
  levelOne();
} catch (errorObj) {
  console.log(errorObj.stack);
}
```

- вывод

```
Error: fail
    at levelTwo (...)
    at levelOne (...)
```

- показывает:
  - где произошла ошибка
  - как туда пришли (цепочка вызовов)

## встроенные типы ошибок

1. `ReferenceError` - возникает при обращении к переменной, которой не существует
2. `TypeError` - возникает, когда значение есть, но оно используется не по типу
3. `SyntaxError` - возникает, когда код написан неправильно с точки зрения синтаксиса (такие ошибки ловятся до выполнения кода, они не попадают в try-catch)

## изменение значений свойств

```js
const customError = new Error('fail');
customError.name = 'CustomError';

console.log(customError.name); // CustomError
```

```js
function parseUserData(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (errorObj) {
    console.log(errorObj.name); // SyntaxError
    console.log(errorObj.message); // описание
    return null;
  }
}
```
