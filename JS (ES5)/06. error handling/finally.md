# finally

- это блок, который выполняется ВСЕГДА
- не важно:
  - была ошибка или нет
  - был `return` или нет
  - был `throw` или нет

## базовый синтаксис

```js
try {
  //
} catch (error) {
  //
} finally {
  //
}
```

## главная идея

- `finally` - это место для кода, который должен выполниться при любом исходе

## пример

```js
function simpleFinallyExample() {
  try {
    console.log('try');
  } catch (errorValue) {
    console.log('catch');
  } finally {
    console.log('finally');
  }
}

simpleFinallyExample();
```

- вывод:

```
try
finally
```

## пример с ошибкой

```js
function errorFinallyExample() {
  try {
    throw new Error('fail');
  } catch (errorValue) {
    console.log('catch');
  } finally {
    console.log('finally');
  }
}

errorFinallyExample();
```

- вывод:

```
catch
finally
```

## критически важное поведение

- `finally` выполняется даже при `return`

```js
function returnFinallyExample() {
  try {
    return 'from try';
  } finally {
    console.log('finally');
  }
}

console.log(returnFinallyExample());
```

- вывод:

```
finally
from try
```

- порядок:
  1. `return` запоминается
  2. выполняется `finally`
  3. потом возвращается значение

## ⚠️ ловушка #1 - `finally` может перезаписать `return`

```js
function overrideReturnExample() {
  try {
    return 'try';
  } finally {
    return 'finally';
  }
}

console.log(overrideReturnExample()); // finally
```

- потому что `finally` имеет приоритет

## ⚠️ ловушка #2 = `finally` может съесть ошибку

```js
function swallowErrorExample() {
  try {
    throw new Error('fail');
  } finally {
    return 'done';
  }
}

console.log(swallowErrorExample()); // done
```

- ошибка вообще не выйдет наружу

## когда реально используют `finally`

- для cleanup (очистка ресурсов)

### пример

```js
function processData() {
  let resourceValue = 'opened';

  try {
    console.log('processing');
    throw new Error('fail');
  } catch (errorObj) {
    console.log('error handled');
  } finally {
    resourceValue = 'closed';
    console.log('cleanup done');
  }
}

processData();
```
