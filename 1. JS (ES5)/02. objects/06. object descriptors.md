# дескрипторы объектов

- в JS каждое свойство объекта имеет дескриптор - набор метаданных, которые описывают это свойство
- дескрипторы делятся на 2 типа:
  - data descriptors - свойства со значением
  - accessor descriptors - свойства с геттерами и сеттерами

- каждый дескриптор может содержать несколько булевых флагов:
  - `value` - значение свойства (для data descriptor)
  - `writable` - можно ли изменить значение свойства
  - `enumerable` - показывается ли свойство в `for...in` или `Object.keys()`
  - `configurable` - можно ли удалить свойство или изменить его дескриптор
  - `get` - функция-геттер (для accessor descriptor)
  - `set` - функция-сеттер (для accessor descriptor)

## получение дескрипторов

- для получение дескриптора используется метод `getOwnPropertyDescriptor` глобального объекта `Object`
- первым параметром он принимает объект, а вторым - свойство, для которого нужно получить дескриптор

```js
const obj = { a: 10 };
const desc = Object.getOwnPropertyDescriptor(obj, 'a');
console.log(desc); // { value: 10, writable: true, enumerable: true, configurable: true }
```

✅ по умолчанию при создании свойства через литерал `{}`, все флаги выставлены в `true`

## установка дескрипторов

- для изменения поведения свойства используется метод `defineProperty` глобального объекта `Object`
- первым параметром он принимает объект, вторым - свойство, для которого нужно изменить поведение, третьим - объект с новыми настройками

```js
const obj = {};
Object.defineProperty(obj, 'b', {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(obj.b); //42

obj.b = 100;
console.log(obj.b); // всё ещё 42

delete obj.b;
console.log(obj.b); // всё ещё 42
```

## accessor descriptors

- вместо хранения значения прямо в объекте свойство вычисляется на лету через функции
  - getter - функция, которая вызывается при чтении свойства
  - setter - функция, которая вызывается при присваивании значения свойству

```js
const obj = {
  _x: 1,
  get x() {
    console.log('get x');
    return this._x;
  },
  set x(value) {
    console.log('set x', value);
    this._x = value;
  },
};

console.log(obj.x); // на самом деле вызывается функция get x(); _x - внутреннее реальное значение
obj.x = 10; // вызывается функция set x()
console.log(obj.x);
```

- сеттер позволяет контролировать, что происходит при присвоении значения - можно добавлять проверки, логику или вычисления, прежде чем реально менять данные

- accessor descriptors дают контроль над чтением и записью свойств, вместо того, чтобы просто хранить данные

- получение accessor descriptor

```js
const obj = {
  get value() {
    return 10;
  },
};

const descriptor = Object.getOwnPropertyDescriptor(obj, 'value');

// {get: function value() {...}, set: undefined, enumerable: true, configurable: true}
```

## полезные паттерны

1. сделать свойство только для чтения

```js
Object.defineProperty(obj, 'readonly', {
  value: 123,
  writable: false,
});
```

2. сделать свойство невидимым для перебора:

```js
Object.defineProperty(obj, 'hidden', {
  value: 'secret',
  enumerable: false,
});
console.log(Object.keys(obj)); // 'hidden' не покажется
```

3. сделать свойство неудаляемым:

```js
Object.defineProperty(obj, 'permanent', {
  value: 'forever',
  configurable: false,
});
delete obj.permanent; // не сработает
```

## моменты

1. литералы объектов создают свойства с `writable`, `enumerable`, `configurable` = true
2. геттер/сеттер свойства - это всегда `accessor descriptor`
3. data и accessor descriptors не могут сосуществовать в одном свойстве; при попытке `defineProperty` они заменяют друг друга
   - если есть обычное свойство с value, при попытке сделать для него геттер/сеттер через `defineProperty`, старое значение исчезнет, и вместо него появится геттер/сеттер

```js
const obj = { a: 10 };
Object.defineProperty(obj, 'a', {
  get() {
    return 100;
  },
});
console.log(obj.a); // 100
```

- здесь `a` было data property (`value: 10`) -> после `defineProperty` стало accessor property (геттер), и старое значение 10 исчезло

- то же работает наоборот: если есть гетте/сеттер, и задать `value` через `defineProperty`, геттер/сеттер пропадут, появится обычное значение

💡 свойство может быть либо обычным `value`, либо через геттер/сеттер, но одновременно нет. если менять тип, старое исчезает
