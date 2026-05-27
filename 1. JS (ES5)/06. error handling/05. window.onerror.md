# глобальная обработка ошибок через `window.onerror`

- `window.onerror` - это глобальный обработчик ошибок в браузере

- он ловит ошибки, которые не были пойманы через `try-catch`

- если ошибка "вырвалась наружу" и нигде не обработана - её поймает `window.onerror`

## пример

```js
window.onerror = function () {
  console.log('Глобальная ошибка!');
};

function crashFunction() {
  notDefinedVariable; // ❌ ReferenceError
}

crashFunction(); // Глобальная ошибка
```

## как это работает

```js
window.onerror = function (
  messageValue, // текст ошибки
  sourceValue, // файл
  lineValue, // строка
  columnValue, // колонка
  errorObject, // сам объект Error
) {
  console.log(messageValue);
};
```

## важный момент #1 - он не ловит ошибки внутри `try-catch`

```js
window.onerror = function () {
  console.log('Global');
};

try {
  throw new Error('fail');
} catch (e) {
  console.log('Local');
}
```

- вывод:

```
Local
```

- потому что ошибка уже обработана

## важный момент #2 - асинхронные ошибки

```js
window.onerror = function () {
  console.log('Global error');
};

setTimeout(() => {
  notDefinedVar;
}, 1000);
```

- в большинстве случаев:

```
Global error
```

- потому что ошибка "всплыла" глобально

## важный момент #3 - `return true` подавляет ошибку

```js
window.onerror = function () {
  console.log('Handled');
  return true;
};

notDefinedVar;
```

- в консоли:
  - не будет стандартной ошибки
  - только 'Handled'

## когда это используют в реальных приложениях:

- логирование ошибок
- отправка данных на сервер
- fallback UI

## пример

```js
window.onerror = function (messageValue, sourceValue, lineValue) {
  console.log('Error happened:', messageValue);
  // отправка на сервер
};
```

## ограничения
- не ловит:
    - ошибки внутри `try-catch`
    - некоторые ошибки из других доменов (CORS)
    - иногда внутри `async` ошибки (лучше использовать `unhandledrejection`)