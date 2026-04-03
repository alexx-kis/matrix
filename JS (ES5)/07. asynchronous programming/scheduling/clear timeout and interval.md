# очистка таймеров и интервалов

## 1. зачем вообще нужно очищать таймера

- при вызове setTimeout или setInterval браузер регистрирует задачу и хранит её где-то внутри (Web APIs)
- но сам он не знает, когда больше не нужен этот таймер

- поэтому необходимо вручную остановить таймер, если он больше не нужен

## 2. clearTimeout

- отменяет отложенный setTimeout

```js
const timeoutIdOne = setTimeout(() => {
  console.log('This will not run');
});

clearTimeout(timeoutIdOne);
```

### что происходит:

1. setTimeout вернул id
2. передали его в clearTimeout
3. задача удалена -> callback не выполнится

## 3. clearInterval

- останавливает повторяющийся setInterval

```js
let counterD = 0;

const intervalIdOne = setInterval(() => {
  counterD++;
  console.log(counterD);

  if (counterD === 3) {
    clearInterval(intervalIdOne);
  }
}, 1000);
```

### вывод:

```
1
2
3
```

## 4. что возвращают setTimeout / setInterval

```js
const timerIdExample = setTimeout(() => {}, 1000);
```

- timerIdExample - это число (в браузере) или объект (в NodeJS)
- без этого ID невозможно остановить таймер

## 5. частая ошибка

```js
setTimeout(() => {
  console.log('Hi');
}, 1000);

clearTimeout(); // ❌ не работает
```

## 6. очень важный кейс

```js
const timeoutIdTwo = setTimeout(() => {
  console.log('Hello');
}, 0);

clearTimeout(timeoutIdTwo);
```

- ничего не выведется, потому что даже при 0 callback идёт в очередь, но мы успели отменить до выполнения

## 7. работа с setInterval

```js
setInterval(() => {
  console.log('Running...');
}, 1000);
```

- если не остановить:
  - будет работать вечно
  - утечка памяти
  - лишняя нагрузка

## 8. практический пример

- имитация запроса с отменой

```js
const timeoutIdThree = setTimeout(() => {
  console.log('Request finished');
}, 3000);

// пользователь ушёл со страницы
clearTimeout(timeoutIdThree);
```

- мы отменили "запрос"

## 9. частый паттерн: debounce (упрощённо)

```js
let timeoutIdFour;

function handleInput() {
  clearTimeout(timeoutIdFour);

  timeoutIdFour = setTimeout(() => {
    console.log('Send request');
  }, 500);
}
```

### что происходит

- пользователь печатает
- старый таймер отменяется
- создаётся новый

## 10. связь с Event Loop

- важно понимать:

- clearTimeout / clearInterval
  - не удаляют из call stack
  - предотвращают попадание callback в очередь
  - или удаляют его из планирования

## итог

- setTimeout / setInterval возвращают ID
- через ID можно:
  - clearTimeout(id)
  - clearInterval(id)
- без очистки:
  - возможны баги
  - утечки памяти
  - бесконечные процессы

## задача

```js
const timeoutIdFive = setTimeout(() => console.log('A'), 0);

Promise.resolve().then(() => {
  clearTimeout(timeoutIdFive);
});

setTimeout(() => console.log('B'), 0);
```

- Сначала выполняется синхронный код, где оба `setTimeout` регистрируются как macrotasks, а `Promise.then` — как microtask. Затем Event Loop сначала выполняет microtask, который вызывает `clearTimeout` и удаляет первый таймер. После этого выполняются macrotasks, и остаётся только второй `setTimeout`, поэтому вывод будет B
