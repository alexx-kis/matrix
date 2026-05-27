# try- catch

- это конструкция, которая позволяет перехватывать ошибки, чтобы программа не падала

- без неё:

```js
console.log('start');

nonExistingFunction(); // ошибка

console.log('end');
```

- с ней:

```js
console.log('start');

try {
  nonExistingFunction(); // ошибка
} catch (error) {
  console.log('ошибка поймана');
}

console.log('end');
```

### вывод

- код не ломается полностью
- ошибки обрабатываются вручную

## как это работает

1. JS выполняет код внутри `try`
2. если ошибки нет -> `catch` игнорируется
3. если ошибка есть -> выполнение:
   - сразу прерывается
   - управление передаётся в `catch`

### пример с объяснением

```js
try {
  console.log('1');
  let resultValue = someUnknownVariable + 10; // ошибка
  console.log('2');
} catch (caughtError) {
  console.log('Ошибка произошла!');
}

console.log('3');
```

- что будет:

```
1
Ошибка произошла!
3
```

- '2' нет, потому что ошибка остановила выполнение программы внутри `try`

## объект ошибки (error)

- в `catch (error)` попадает объект с информацией:

```js
try {
  undefinedVariable;
} catch (errorObject) {
  console.log(errorObject.name); // ReferenceError
  console.log(errorObject.message); // undefinedVariable is not defined
}
```

- `name` - тип ошибки
- `message` - описание

## можно ли не писать `error`?

- да, если не использовать

```js
try {
  doSomethingWrong();
} catch {
  console.log('Ошибка есть, но не важно какая');
}
```

## важные моменты

### 1. try-catch ловит только runtime ошибки

- он не ловит синтаксические ошибки - код даже не запустится

```js
try {
  eval('let = 5'); // синтаксическая ошибка внутри строки
} catch (error) {
  console.log('Поймали');
}
```

### 2. можно использовать finally

- finally выполнится всегда, была ошибка или нет, даже если есть `return`

```js
try {
  console.log('try');
} catch (e) {
  console.log('catch');
} finally {
  console.log('finally');
}
```

#### пример

```js
function parseUser(jsonString) {
  try {
    const parsedUser = JSON.parse(jsonString);
    return parsedUser.name;
  } catch (error) {
    return 'Invalid JSON';
  }
}
```

- здесь защищаемся от кривых данных
- не даём приложению упасть

## 🔥 Частая ошибка на собеседованиях

```js
try {
  return 'from try';
} catch (e) {
  return 'from catch';
} finally {
  return 'from finally';
}
```

- результат: 'from finally'

- потому что `finally` перезаписывает return, если сам возвращает что-то или бросает ошибку - это ловушка

## 🧠 Супер-коротко для собеса

- Если в finally есть return или throw — он перебивает всё, что было в try/catch
