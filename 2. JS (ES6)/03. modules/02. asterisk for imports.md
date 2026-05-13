# `*` for imports

- это называется namespace import или import all as object

## что делает `*`

- символ `*` означает "импортировать всё"

```js
export const addNumbers = (firstValue, secondValue) => {
  return firstValue + secondValue;
};

export const subtractNumbers = (firstValue, secondValue) => {
  return firstValue - secondValue;
};

export const multiplyNumbers = (firstValue, secondValue) => {
  return firstValue * secondValue;
};
```

- обычный импорт:

```js
import { addNumbers, subtractNumbers } from './mathTools.js';
```

- `* as`:

```js
import * as mathTools from './mathTools.js';
```

- теперь:

```js
mathTools.addNumbers(5, 2);
mathTools.subtractNumbers(10, 3);
mathTools.multiplyNumbers(4, 6);
```

## что реально происходит

- примерно создаётся объект:

```js
const mathTools = {
  addNumbers,
  subtractNumbers,
  multiplyNumbers,
};
```

- то есть

```js
mathTools.addNumbers;
```

- это ссылка на экспортированный модуль

## почему это называется namespace import

- потому что все импорты собираются в один namespace-объект

## когда это удобно

1. когда экспортов очень много

```js
import * as dateHelpers from './dateHelpers.js';
```

2. чтобы избежать конфликтов имён

```js
import * as adminApi from './adminApi.js';
import * as userApi from './userApi.js';
```

- теперь:

```js
adminApi.loadProfile();
userApi.loadProfile();
```

- без конфликтов

3. когда нужен "модуль как объект"

- иногда это просто удобнее архитектурно

- `*` не импортирует default export напрямую

- пример:

```js
// logger.js

export default function createLogger() {}

export const loggerVersion = '2.0';
```

- импорт:

```js
import * as loggerModule from './logger.js';
```

- теперь:

```js
loggerModule.loggerVersion;
```

- но default export будет лежать в

```js
loggerModule.default;
```

## почему так

- потому что namespace import собирает named exports в объект
- а `default` - это специальное свойство

## частая ошибка

```js
import * from './file.js'; // так нельзя
```

- нужно имя namespace

```js
import * as helpersBundle from './file.js';
```
