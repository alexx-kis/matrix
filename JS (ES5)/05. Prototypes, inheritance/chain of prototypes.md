# цепочка прототипов

- это механизм, по которому JS ищет свойства в объектах

- если свойства нет в объекте -> JS идёт вверх по `__proto__`

## базовый пример

```js
const baseObject = {
  canEat: true;
}

const animalObject = {
  canRun: true;
}

const dogObject = {
  canBark: true;
}

animalObject.__proto__ = baseObject;
dogObject.__proto__ = animalObject;
```

- теперь цепочка такая:

```
dogObject
   ↓ __proto__
animalObject
   ↓ __proto__
baseObject
   ↓ __proto__
Object.prototype
   ↓
null
```

## как происходит поиск свойства

```js
console.log(dogObject.canEat);
```

- JS делает шаги:

1. ищет в `dogObject` -> не находит
2. идёт в `animalObject` -> не находит
3. идёт в `baseObject` -> находит
4. нашёл -> возвращает `true`

- это и есть prototype chain

## важно: конец цепочки

```js
Object.prototype.__proto__ === null;
```

- это конец цепочки

## почему работает `toString`, `hasOwnProperty` итд

```js
const userObject = {};

console.log(userObject.toString());
```

- `toString` нет в `userObject`
- JS идёт: `userObject` -> `Object.prototype` -> там есть `toString()`

## shadowing (перекрытие свойств)

- если свойство найдено раньше - цепочка дальше не проверяется

```js
const baseConfig = {
  speed: 10;
}

const customConfig = {
  speed: 50;
}

customConfig.__proto__ = baseConfig;

console.log(customConfig.speed); / 50
```

- `speed` найдет сразу, до `baseConfig`JS даже не дошёл
- это называется property shadowing

## запись свойства

```js
const baseSettings = {
  level: 1,
};

const userSettings = {};

userSettings.__proto__ = baseSettings;

userSettings.level = 5;
```

- не изменился `baseSettings`, потому что запись всегда идёт в сам объект, а не в прототип

```js
console.log(baseSetting.level); // 1
console.log(userSettings.level); // 5
```

## исключение (если это объект внутри)

```js
const baseData = {
  settingsObject: {
    theme: "dark"
  }
};

const userData = {};

userData.__proto__ = baseData;

userData.settingsObject.theme = "light";

console.log(baseData.settingsObject.theme); // "light"
```

- потому что `settingsObject` - это один и тот же объект по ссылке