# создание объекта с прототипом

## 1. самый важный способ - `Object.create`

- создаёт новый объект и сразу задаёт ему прототип

```js
const newObject = Object.create(protoObject);
```

### пример

```js
const baseUser = {
  canLogin: true,
};

const newUser = Object.create(baseUser);

console.log(newUser.canLogin); // true
```

- что произошло:

`newUser.__proto__ === baseUser // true`

- это лучший способ, потому что
  1. не используется `__proto__`
  2. чисто и правильно
  3. часто спрашивают на собеседованиях

## 2. через конструктор + `new`

```js
function UserConstructor(name) {
  this.name = name;
}

UserConstructor.prototype.sayHi = function () {
  console.log(this.name);
};

const userInstance = new UserConstructor('Alex');
```

## 3. через `class`

```js
class AnimalClass {
  constructor(type) {
    this.type = type;
  }

  makeSound() {
    console.log('sound');
  }
}

const animalInstance = new AnimalClass('dog');
```

## 4. через `Object.setPrototypeOf` (не рекомендуются)

```js
const baseConfig = {
  isEnabled: true,
};

const configObject = {};

Object.setPrototypeOf(configObject, baseConfig);
```

- почему плохо?
  1. меняет прототип после создания объекта
  2. это медленно и хуже для оптимизации

## 5. через `__proto__` (legacy способ)

```js
const baseSettings = {
  mode: 'dark',
};

const settingsObject = {
  __proto__: baseSettings,
};
```

- почему не стоит использовать:
  1. устаревший подход
  2. может привести к багам
  3. хуже читается

## сравнение способов

```
способ                      когда использовать

Object.create	              ✅ лучший для явного прототипа
new + constructor	          ✅ когда создаёшь "классы"
class	                      ✅ современный стиль
Object.setPrototypeOf	      ⚠️ редко
__proto__	                  ❌ избегать
```

## 7. очень важный нюанс

- у объекта без прототипа

```js
const cleanObject = Object.create(null);
```

- что будет

```js
console.log(cleanObject.toString); // undefined
```

- потому что нет `Object.prototype` в цепочке

- это используется когда
  1. нужен "чистый словарь"
  2. без лишних методов

