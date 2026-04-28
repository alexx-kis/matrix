# установка и получение прототипа объекта

## 1. получить прототип - `Object.getPrototypeOf`

- возвращает прототип объекта

```js
const baseUser = {
  isAdmin: true,
};

const userObject = Object.create(baseUser);

const protoResult = Object.getPrototypeOf(userObject);

console.log(protoResult === baseUser); // true
```

### аналог, но хуже

```js
userObject.__proto__;
```

## 2. установка прототипа - `Object.setPrototypeOf`

- устанавливает прототип объекту

```js
const baseSettings = {
  isEnabled: true,
};

const settingsObject = {};

Object.setPrototypeOf(settingsObject, baseSettings);

console.log(settingsObject.isEnabled); // true
```

### аналог, но хуже

```js
settingsObject.__proto__ = baseSettings;
```

## 3. очень важное предупреждение

`Object.setPrototypeOf` - медленный, потому что JS-движок оптимизирует объекты под фиксированную структуру, смена прототипа ломает оптимизацию

### поэтому правило:

- не менять прототип после создания
- вместо этого:

```js
const obj = Object.create(baseObject);
```

## 4. проверка прототипа

- как проверить прототип?

### вариант 1 (лучший)

```js
Object.getPrototypeOf(obj) === baseObject;
```

### вариант 2 (менее популярный)

```js
baseObject.isPrototype(obj)
```