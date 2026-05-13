# import/export syntax

- это механизм модулей в JS

- модули нужны для того, чтобы:
  - разбивать код на файлы
  - переиспользовать функции/классы/объекты
  - не держать проект в одном огромном файле
  - избегать конфликтов имён
  - делать код поддерживаемым

## почему модули вообще появились

- раньше JS работал примерно так:

```html
<script src="helpers.js"></script>
<script src="app.js"></script>
```

- все функции и переменные попадали в глобальную область видимости (window в браузере)

- например:

```js
// helpers.js

function formatPrice(price) {
  return `$${price}`;
}
```

```js
// app.js

console.log(formatPrice(100));
```

- проблемы
  - все файлы связаны глобально
  - можно случайно перезаписать функцию
  - трудно понимать зависимости
  - сложно масштабировать проект

- поэтому появился модульный подход

## что такое модуль

- это обычный JS-файл, но со своей собственной областью видимости

- например:

```js
// priceUtils.js

const taxRate = 0.2;
``;
```

- переменная `taxRate` не будет доступна в другом файле автоматически

- чтобы что-то отдать наружу `export`
- чтобы что-то получить из другого файла `import`

## основная идея

- один файл что-то экспортирует

```js
// mathOperations.js

export const squareNumber = (value) => {
  return value * value;
};
```

- другой файл импортирует

```js
// mathOperations.js

export const squareNumber = (value) => {
  return value * value;
};
```

## типы экспорта

1. named export (именованный экспорт)

```js
// stringUtils.js

export const capitalizeWord = (textValue) => {
  return textValue[0].toUpperCase() + textValue.slice(1);
};

export const reverseText = (textValue) => {
  return textValue.split('').reverse().join('');
};
```

- как импортировать:

```js
import { capitalizeWord, reverseText } from './stringUtils.js';
```

- фигурные скобки нужны потому что достаются конкретные экспортированные сущности по имени
- можно импортировать только то, что нужно

```js
import { reverseText } from './stringUtils.js';
```

- можно переименовать:

```js
import { reverseText as makeReverse } from './stringUtils.js';
```

- теперь:

```js
makeReverse('hello');
```

- можно экспортировать в конце файла

```js
const getUserAge = (birthYear) => {
  return 2026 - birthYear;
};

const getUserStatus = () => {
  return 'active';
};

export { getUserAge, getUserStatus };
```

2. default export

- у модуля может быть один главный экспорт

```js
// logger.js

export default function createLogger(messageText) {
  console.log(messageText);
}
```

- импортируется без фигурных скобок, потому что default export считается главным содержимым файла:

```js
import createLogger from './logger.js';
```

- можно назвать как угодно

```js
import customLoggerFunction from './logger.js';
```

- можно использовать вместе:

```js
// apiService.js

export const apiVersion = 'v1';

export default function sendRequest() {
  console.log('request');
}
```

```js
import sendRequest, { apiVersion } from './apiService.js';
```

## что экспортируют чаще всего

- функции
- константы
- классы
- объекты

### import выполняется ДО запуска кода

- JS сначала:
  1. анализирует импорты
  2. строит дерево зависимостей
  3. только потом запускает код

- поэтому import нельзя писать где угодно

```js
if (true) {
  import { testValue } from './test.js'; // не надо так
}
```

- обычный import - только на верхнем уровне файла

- но есть dynamic import

```js
const moduleData = await import('./helpers.js');
```

- он работает во время выполнения

- используется для:
  - lazy loading
  - code splitting
  - динамической загрузки

## ES Modules

- это современная система модулей JS

- использует:

```js
import
export
```

## CommonJS

- это старая система модулей Node.js

- использует

```js
require();
module.exports;
```

## Namespace import

- иногда импортируют вообще всё

```js
import * as mathHelpers from './mathHelpers.js';
```

- теперь:

```js
mathHelpers.sumValues();
mathHelpers.divideValues();
```

## re-export

- можно переэкспортировать модули

```js
// helpers/index.js
export { formatDate } from './dateHelpers.js';
export { validateEmail } from './validationHelpers.js';
```

```js
// app.js
import { formatDate, validateEmail } from './helpers';
```

- это называется barrel file
- очень популярно в больших проектах

