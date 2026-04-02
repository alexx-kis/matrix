# концепция Event Loop

## что такое Event Loop

- Event Loop - это механизм в JS, который отвечает за управление выполнения выполнения кода, асинхронных операций и очереди задач

- JS - однопоточный, может делать только одну вещь одновременно
- но мы хотим асинхронность: слушать события, таймеры, запросы к серверу и не блокировать интерфейс
- здесь на помощь приходит Event Loop

## основные компоненты Event Loop

1. Call Stack (стек вызовов)
   - здесь выполняется синхронный код
   - работает по принципу LIFO (Last In, Firs Out)

2. Web APIs / Browser APIs
   - таймеры (`setTimeout`), HTTP-запросы (`fetch`), события (`click`)
   - эти операции выполняются в отдельном окружении, не блокируя стек

3. Callback Queue (очередь обратных вызовов)
   - когда async операция завершается, её callback отправляется сюда

4. Event Loop
   - проверяет: "свободен ли стек?"
   - если да - берёт первый callback из очереди и помещает в стек

## визуальное представление

```
Call Stack          Event Loop        Callback Queue
[ main() ]  <--->   проверяет        [ setTimeout callback ]

```

## простой пример

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout 0');
}, 0);

console.log('End');
```

- что произойдёт:
  1. "Start" - синхронно в стек -> выполняется
  2. `setTimeout` - отправляется в Web API, потом в Callback Queue
  3. "End" - синхронно в стек -> выполняется
  4. Event Loop проверяет: стек пуст -> берёт callback из очереди -> `"Timeout 0"`

- результат в консоли:

```
Start
End
Timeout 0
```

- даже `setTimeout(..., 0)` выполняется после всего синхронного кода

## очереди в Event Loop

- есть две основные очереди:
  1. Macro-task queue (макротаски)
     - `setTimeout`, `setInterval`, `setImmediate` (Node.js), `I/O`
  2. Micro-task queue (микротаски)
     - `Promise.then`, `MutationObserver`, `queueMicrotask`

- микротаски выполняются сразу после текущего стека, перед макротасками

## пример с микротасками

```js
console.log('Start');

Promise.resolve().then(() => console.log('Promise 1'));
setTimeout(() => console.log('Timeout 1'), 0);
Promise.resolve().then(() => console.log('Promise 2'));

console.log('End');
```

- порядок выполнения

```
Start    <- синхронно
End      <- синхронно
Promise 1 <- микротаска
Promise 2 <- микротаска
Timeout 1 <- макротаска (setTimeout)
```

- микротаски всегда выигрывают у макротасок, если стек пуст

## главное понимание

- Stack - выполняется прямо сейчас (синхронно)
- Web APIs - ждут завершения операции (асинхронно)
- Callback Queue - ждут своей очереди
- Event Loop - проверяет стек и отправляет callbacks из очереди, когда стек пуст

## почему это важно

- понимание Event Loop - это ключ к:
  - асинхронному JS (`async/await`, `Promise`, `fetch`)
  - не блокирующему UI
  - правильной работе таймеров и событий
  - ответам на собеседования (частый вопрос про порядок выполнения)
