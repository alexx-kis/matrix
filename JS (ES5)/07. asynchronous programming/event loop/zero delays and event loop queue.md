# zero delays and event loop queue

- если поставить задержку 0, выполнится ли код сразу?

```js
setTimeout(() => {}, 0);
```

- нет, никогда не сразу

## что реально означает 0 в `setTimeout`

```js
setTimeout(() => {
  console.log('Hello');
}, 0);
```

- 0 означает: выполни как можно раньше, но только после текущего кода

## как это работает внутри Event Loop

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');
```

1. синхронный код идёт в Call Stack

```js
console.log('Start');
console.log('End');
```

- вывод:

```
Start
End
```

2. `setTimeout`:
   - уходит в Web API
   - после "минимальной задержки" -> в Callback Queue (macrotask)

3. Event Loop:
   - ждёт, пока стек станет пустым
   - только потом берёт callback

### итог

```
Start
End
Timeout
```

## главное правило

`setTimeout(fn, 0)` === отложить выполнение до следующей итерации Event Loop

## почему это не мгновенно

- даже с 0 есть ограничения:
  - минимальная задержка - браузеры часто ставят минимум ~4ms, то есть 0 !== 0ms

## важный момент: очередь (queue)

- `setTimeout` попадает в Macrotask Queue
- но есть ещё Microtask Queue (Promise)

## ключевой подвох

```js
setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));
```

- первым выполнится Promise, а потом setTimeout

- потому что порядок такой:
  1. выполняется весь синхронный код
  2. выполняются все microtasks
  3. потом выполняются все macrotasks

## визуально

```
Call Stack: empty

Microtask Queue:
[ Promise callback ]  ← выполняется первым

Macrotask Queue:
[ setTimeout callback ] ← потом
```

## более сложный пример

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => {
  console.log('C');
});

console.log('D');
```

- порядок выполнения:

```
A
D
C
B
```

## практическое применение

- зачем вообще использовать `setTimeout(..., 0)`

1. разбить тяжёлый код (избежать blocking)

```js
function heavyTaskPart() {
  console.log('Part of heavy task');
}

setTimeout(heavyTask, 0);
```

- даём браузеру "вдохнуть"

2. отложить выполнение

```js
console.log('Step 1');

setTimeout(() => {
  console.log('Step 2 (later)');
}, 0);
```

## частая ошибка

- думать, что `setTimeout(fn, 0)` выполнится сразу
- это - поставь в очередь

## вывод

- 0 - не мгновенно
- это минимальная задержка
- callback идёт в macrotask queue
- выполняется после stack + microtasks
