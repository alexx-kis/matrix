# this

- это специальное ключевое слово, которое указывает на объект контекста выполнения функции

## простыми словами

`this` - это ссылка на объект, который вызвал функцию

⚠️ this определяется НЕ там, где функция написана, а там, где она вызывается

```js
const personProfile = {
  name: 'Alex',
  sayName: function () {
    console.log(this.name);
  },
};

personProfile.sayName(); // 'Alex'
```

## `this` внутри обычное функции

```js
function printMessage() {
  console.log(this);
}

printMessage();
```

- здесь нет объекта перед точкой
- то есть вызов `printMessage()` в браузере (non strict mode) `this === window`
- в строгом режиме будет `undefined`

## почему `this` вызывает столько проблем

- потому что его значение зависит от способа вызова функции
- это называется "call-site" - место вызова функции

```js
const userProfile = {
  name: 'Alex',
  showName: function () {
    console.log(this.name);
  },
};

userProfile.showName(); // 'Alex

const extractedFunction = userProfile.showName;

extractedFunction(); // undefined или window.name
```

- здесь функция оторвалась от объекта
- JS не запоминает, из какого объекта была взята функция

1. из объекта берётся ссылка на функцию
2. эта ссылка сохраняется в переменную
3. информация о `vehicleInfo` не сохраняется
4. функция теперь сама по себе

## важное правило

- `this` определяется во время вызова функции, а не во время создания функции
