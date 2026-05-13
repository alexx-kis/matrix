# import/export as

- используется для переименования

- то есть "взять что-то под другим именем"

## зачем это нужно

- основные причины:
  - избежать конфликтов имён
  - сделать имя понятнее
  - сократить длинное имя
  - переэкспортировать под другим именем

## `import ... as`

- базовый пример:

```js
// colors.js
export const primaryColor = '#ff0000';

// app.js
import { primaryColor as mainColor } from './colors.js';

console.log(mainColor);
```

## что произошло

- импортировали `primaryColor`, но внутри файла назвали `mainColor`

- это не создаёт новый export

## зачем это используют

1. конфликты имён

```js
// userApi.js

export const loadData = () => {
  console.log('user');
};

// productApi.js

export const loadData = () => {
  console.log('product');
};
```

- одинаковые имена под разными именами

```js
import { loadData as loadUserData } from './userApi.js';
import { loadData as loadProductData } from './productApi.js';
```

2. более понятное имя

- иногда export называется слишком абстрактно

```js
// validation.js
export const check = () => {};

// app.js

import { check as validateEmail } from './validation.js';
```

## `export ... as`

- переименование при экспорте

```js
const calculateArea = () => {};

export { calculateArea as getRectangleArea };
```

```js
import { getRectangleArea } from './geometry.js';
```

- это удобно для api модуля
- иногда внутренние имена и публичные отличаются

## очень популярный кейс - re-export

- без реэкспорта:

```js
// stringHelpers.js

export const trimText = () => {};

// index.js

export { trimText } from './stringHelpers.js';
```

- реэкспорт с `as`

```js
export { trimText as cleanText } from './stringHelpers.js';

//

import { cleanText } from './index.js';
```

## export default as

```js
export default as helperTool // так нельзя
```

- можно так:

```js
export { default as helperTool } from './helper.js';
```

- это очень популярный синтаксис
- он берёт default export другого файла и переэкспортирует как named export

- пример:

```js
// modalWindow.js

export default function ModalWindow() {}

// index.js
export { default as ModalWindow } from './modalWindow.js';

// app.js
import { ModalWindow } from './index.js';
```

- это очень часто встречается в React UI libraries

- например:

```js
import { Button, Input, Modal } from 'ui-library';
```

- внутри библиотеки это часто собрано через:

```js
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Modal } from './Modal';
```
