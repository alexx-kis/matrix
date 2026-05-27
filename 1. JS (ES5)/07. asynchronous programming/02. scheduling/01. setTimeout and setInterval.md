# setTimeout и setInterval

## 1. scheduling

- это возможность запланировать выполнение кода позже
- то есть не сейчас, а через время или периодически

## 2. setTimeout - выполнить один раз позже

```js
setTimeout(callback, delay);
```

- callback - функция, которая выполнится
- delay - задержка в миллисекундах

### пример

```js
setTimeout(() => {
  console.log('hello after 2 seconds');
}, 2000);
```

- через 2 секунды выполнится код

### как это работает:

1. setTimeout уходит в Web API
2. ждёт delay
3. попадает в macrotask queue
4. Event Loop выполняет код, когда стек свободен

## 3. setInterval - выполнять периодически

```js
setInterval(callback, interval);
```

### пример

```js
setInterval(() => {
  console.log('Tick every second');
}, 1000);
```

- каждую секунду будет выполняться callback

## 4. зачем они нужны

### 1. отложить выполнение

```js
console.log('Start');
setTimeout(() => {
  console.log('Later');
}, 1000);
```

### 2. не блокировать UI

```js
function taskPertOne() {
  console.log('Part 1');
}

setTimeout(taskPartOne, 0);
```

- даём Event Loop шанс обработать другие задачи

### 3. повторяющиеся задачи

```js
setInterval(() => {
  console.log('Checking updates...');
}, 5000);
```

- например, опрос сервера, обновление данных

### 4. анимации / таймеры

```js
let countC = 0;
const intervalId = setInterval(() => {
  counterC++;
  console.log(counterC);

  if (counterC === 5) {
    clearInterval(intervalId);
  }
}, 1000);
```

## 5. как остановить таймеры

### clearTimeout

```js
const timeoutId = setTimeout(() => {
  console.log('Will not run');
}, 2000);

clearTimeout(timeoutId);
```

### clearInterval

```js
const intervalIdTwo = setInterval(() => {
  console.log('Running...');
}, 1000);

clearInterval(intervalIdTwo);
```

## 6. важный нюанс

- setInterval может быть неточным

```js
setInterval(() => {
  console.log('Tick');
}, 1000);
```

- если callback выполняется долго:
  - следующий запуск не ждёт завершения
  - может происходить "наложение"

### правильный подход (часто лучше)

- использовать не setInterval, а функцию с setTimeout

```js
function repeatTask() {
  console.log('Tick');

  setTimeout(repeatTask, 1000);
}

setTimeout(repeatTask, 1000);
```

- это контролируемый интервал, без наложений

## 7. связь с Event Loop

- оба:
  - идут в macrotask queue
  - выполняются после:
    - sync кода
    - microtasks

## 8. частый вопрос на собеседованиях

- почему setTimeout(fn, 0) выполнится не сразу?
- потому что он идёт в очередь (macrotask), выполнится только, когда стек пуст

## 9. когда использовать что

### setTimeout:

- нужно выполнить 1 раз
- нужен контроль
- избежать багов с интервалом

### setInterval

- простая периодическая задача
- нет сложной логики