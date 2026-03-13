# immediately-Invoked Function Expression (IIFE)

- IIFE - это функция, которая вызывается сразу после создания

```js
(function () {
  console.log('IIFE executed');
})();
```

- когда движок видит код и натыкается на слово function, он воспринимает это как function declaration
- у function declaration обязательно должно быть имя, поэтому такой код приведёт к ошибке:

```js
function () {
  console.log("hi");
}
```

- для IIFE нужно Function Expression, потому что только выражение можно сразу вызвать

```js
const runFunction = function () {};
```

- здесь функция - значение

- чтобы превратить функцию в выражение, её нужно обернуть в скобки

```js
(function () {
  console.log('IIFE executed');
});
```

- теперь можно вызвать с помощью `()`

```js
(function () {
  console.log('IIFE executed');
})();
```

- альтернативный синтаксис:

```
(function () {
  console.log("run");
}());
```

## зачем нужны IIFE

- главная причина - создать собственную область видимости
- раньше (до `let/const`) была только function scope, и IIFE использовали для изоляции переменных

- IIFE использовались в старых библиотеках (jQuery), в модульных паттернах

### сейчас IIFE используются реже

- потому что появились `let`, `const` (с блочной областью видимости) и ES-modules (import/export)


