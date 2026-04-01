# выбрасывание исключений

## оператор `throw`

- это оператор, который выбрасывает ошибку вручную

## базовый синтаксис

```js
throw value;
```

## простой пример

```js
function checkAge(userAge) {
  if (userAge < 18) {
    throw new Error('Access denied');
  }
  return 'Access granted';
}
```

## использование

```js
try {
  console.log(checkAge(15));
} catch (error) {
  console.log(error.message); // 'Access denied'
}
```

## почему это важно

- `throw` позволяет:
  - валидировать данные
  - останавливать выполнение
  - сигнализировать об ошибках

## что важно понять

- `throw`:
  - сразу останавливает выполнение
  - работает, как ручная ошибка
  - передаёт управление в ближайший catch

## что именно можно бросать

- можно бросать что угодно, однако лучше бросать только ошибки

## пример с `Error`

```js
function divideNumbers(numA, numB) {
  if (numB === 0) {
    throw new Error('Cannot divide by zero');
  }

  return numA / numB;
}

try {
  console.log(divideNumbers(10, 0));
} catch (error) {
  console.log('ошибка');
}
```

## очень важный момент

- `throw` прерывает выполнение функции

```js
function testThrowStop() {
  console.log('1');

  throw new Error('fail');

  console.log('2');
}

testThrowStop();
```

- вывод:

```
'1'
(ошибка)
```

## если нет `try-catch`?

```js
function crashApp() {
  throw new Error('Boom');
}

crashApp();
```

- результат:
  - ошибка "всплывает"
  - программа падает

## проброс ошибки вверх

```js
function innerFunction() {
  throw new Error('Inner error');
}

function outerFunction() {
  innerFunction();
}

try {
  outerFunction();
} catch (errorValue) {
  console.log('Caught!');
}
```

- ошибка поднимается вверх по стеку вызовов
- это называется `error propagation`

## частый вопрос на собесе

- в чём разница:

```js
return 'error';

// и

throw new Error('error');
```

- `return` просто возвращает значение и программа продолжается
- `throw` ломает текущий поток выполнения, требует `catch`
