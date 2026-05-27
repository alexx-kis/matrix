# Macro and Micro Tasks

- когда асинхронный код готов к выполнению, он попадает в очередь задач

- но очередей две:
  1. Macrotask Queue
  2. Microtask Queue

## разница на интуитивном уровне

- microtasks - приоритетные (выполняются раньше)
- macrotasks - обычные (выполняются позже)

## что относится к каждой очереди

- Macrotasks:
  - `setTimeout`
  - `setInterval`
  - `setImmediate` (Node.js)
  - `I/O`
  - `UI events` (click, scroll)

- Microtasks:
  - `Promise.then / catch / finally`
  - queueMicrotask
  - MutationObserver

## главный алгоритм Event Loop

1. выполнить весь синхронный код (Call Stack)
2. выполнить все microtasks
3. выполнить один macrotask
4. снова выполнить все microtasks
5. повторить

## это ключевая вещь

- microtasks всегда полностью очищаются перед переходом к следующей macrotask

## базовый пример

```js
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('End');
```

- результат:

```
Start
End
Promise
Timeout
```

## более сложный пример

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => {
  console.log('C');
  Promise.resolve().then(() => console.log('D'));
});

console.log('E');
```

- синхронно: A, E
- microtasks: C, D
- macrotasks: B

## важный нюанс

- microtasks могут захватить Event Loop

```js
function recursiveTask() {
  Promise.resolve().then(recursiveTask);
}

recursiveTask();

setTimeout(() => console.log('Timeout'), 0);
```

- `setTimeout` никогда не выполнится, потому что:
  - microtasks постоянно добавляют сами себя
  - Event Loop не доходит до macrotask

## вывод

- microtasks могут заблокировать цикл, если неосторожно их использовать

## разница в реальной жизни

- microtasks - для:
  - логики после Promise
  - почистить состояние
  - гарантированно выполнить сразу после текущего кода

- macrotasks - для:
  - таймеров
  - событий пользователя
  - разбивки тяжёлых задач
