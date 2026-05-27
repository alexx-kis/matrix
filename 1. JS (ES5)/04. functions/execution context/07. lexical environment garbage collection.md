# Lexical Environment Garbage Collection

- garbage collection - это процесс удаления из памяти объектов, которые больше не доступны: если к данным нет ссылок -> они удаляются

## связь с lexical environment

- lexical environment - это тоже объект в памяти
- значит, если на него нет ссылок -> он удаляется GC

### пример

```js
function testFunction() {
  let valueA = 10;
}
testFunction();
```

- что происходит:
  - создаётся lexical environment
  - valueA хранится внутри
  - функция заканчивается

=> больше нет ссылок на это окружение => GC удаляет его из памяти

## важный кейс - замыкание

```js
function createStorage() {
  let dataValue = 100;

  return function () {
    console.log(dataValue);
  };
}

let storageFunction = createStorage();
```

- удалится ли `dataValue`? - нет, потому что есть ссылка

```
`storageFunction` → [[Environment]] → { dataValue: 100 }
```

### ключевая идея:

- замыкание удерживает lexical environment в памяти

- когда удалится?: `storageFunction = null;`
- теперь нет ссылок на функцию -> нет ссылок на её `[[Environment]]`
- GC удаляет всё

### ⚠️важный момент

- GС работает не "по выходу из функции", а по достижимости (reachability)

### 🔥 reachability (достижимость)

- объект жив, если:
  - есть ссылка на него
  - или можно добраться по цепочке ссылок

### пример

```js
function outerLayer() {
  let bigData = new Array(1000000);

  return function () {
    console.log('Hello');
  };
}

let fn = outerLayer();
```

- вопрос: удалится ли bigData? - нет, потому что

```
fn → [[Environment]] → содержит всё окружение
```

- даже если `bigData` не используется

- это называется **memory leak через closure**

### как избежать

- плохо:

```js
function createHandler() {
  let hugeData = new Array(1000000);

  return function () {
    console.log('click');
  };
}
```

- лучше:

```js
function createHandler() {
  return function () {
    console.log('click');
  };
}
```

- или

```js
function createHandler() {
  let hugeData = new Array(1000000);

  return function () {
    console.log(hugeData.length);
  };
}
```

- теперь использование оправдано

### 💥 частый вопрос на собесе

- может ли замыкание вызвать утечку памяти?
- да, если держит ссылки на большие данные, которые больше не нужны

### как ответить

- GC удаляет лексическое окружение, когда оно становится недостижимым. однако, если существует замыкание, которое ссылается на это окружение, оно остаётся в памяти, что может привести к утечкам памяти, если в окружении хранятся большие данные

### задача

```js
function createDataHolder() {
  let dataArray = [1, 2, 3];

  return function () {
    return dataArray[0];
  };
}

let holder = createDataHolder();

holder = null;
```

❓ Ответь:

- будет ли dataArray удалён?
- почему?

- да, dataArray будет удалён GC, потому что ссылка на функцию и её лексическое окружение исчезнут

- собес-формулировка: 👉 После присвоения holder = null исчезает последняя ссылка на функцию, а значит и на её лексическое окружение. Поскольку dataArray доступен только через это окружение, он становится недостижимым и удаляется сборщиком мусора.
