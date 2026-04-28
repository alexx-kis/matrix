# глобальный контекст (window)

- когда JS запускается, он всегда начинает с глобального контекста выполнения (global execution context)
- это как "самый внешний уровень" программы

## главная идея
- глобальный контекст - это место, где
  1. создаются глобальные переменные
  2. объявляются функции
  3. определяется глобальный объект (window в браузере)

# window

- это огромный объект, внутри которого лежит всё:

  - console
  - setTimeout
  - alert
  - document
  - глобальные переменные

### пример

```js
var userName = 'Alex'

console.log(window.userName); // 'Alex'
```

- глобальные переменные становятся свойствами `window`

⚠️ let и const не попадают в window, а var попадает

```js
let ageValue = 25;
const cityName = 'Amsterdam';


console.log(window.ageValue); // undefined
console.log(window.cityName); // undefined
```

## `this` в глобальном контексте

- в глобальном контексте `this === window`

```js
console.log(this); // window
```

- в строгом режиме `this` тоже ссылается на `window`, а в функциях он уже будет `undefined`

⚠️ важно

1. можно случайно перезаписать глобальные данные

```js
var name = 'Alex';
var name = 'Kate'; // перезаписали
```

2. загрязнение глобальной области (global pollution)
- если много переменных - они все летят в `window`

3. это влияет на `this`

```js
function showName() {
  console.log(this)
}

showName(); // window (или undefined в strict mode (это внутри функции!))
```

## очень важно

- если передать метод объекта, как коллбэк, то `this` потеряется, это станет обычным вызовом функции:

```js
const userData = {
  name: 'Alex',
  showName: function() {
    console.log(this.name)
  }
};

setTimeout(userData.showName, 1000); // undefined или ошибка (strict mode)
```

- здесь берётся функция `userData.showName` и передаётся как коллбэк
- setTimeout вызывает её так `callback();`, а не так `userData.callback();`

- чтобы исправить такую ошибку, можно воспользоваться методом `bind`

```js
setTimeout(userData.showName.bind(userData), 1000);
```

- или стрелочной функцией (или просто безымянной) - обёрткой

```js
setTimeout(() => userData.showName(), 1000);

setTimeout(function () {
  userData.showName();
}, 1000);

```