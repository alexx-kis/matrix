# типы данных

## список типов данных

- в JS есть 8 типов данных, они делятся на 2 группы
  1. примитивы (string, number, boolean, undefined, null, bigint, symbol) : 7
  2. ссылочные (object) : 1

## 1. примитивы

- это простое значение, которое хранится непосредственно в переменной
- они immutable - их нельзя изменить

### string (строка)

- это текст
- строки можно писать в "double quotes", 'single quotes', `template strings`

### number (число)

- в JS нет отдельных типов для int и float

```js
const productPrice = 120;
const temperatureValue = 21.5;
```

- также сюда входят: `Infinity`, `-Infinity`, `NaN`

### bigint (очень большое число)

```js
const galaxyPopulation = 9007199254740995n;
```

- используется суффикс `n`
- `bigint` нужен, потому что `Number` безопасен только до `9007199254740991`, то есть JS может точно хранить и сравнивать целые числа только до этого значения. если число больше, то теряется точность

- тип `Number` хранится в формате `IEEE-754 double precision (64-bit floating point)`
- из этих 64 бит:
  - 1 бит — знак
  - 11 бит — экспонента
  - 52 бита — мантисса (точность)

- таким образом, максимально точное целое число: `2^53 - 1 === 9007199254740991`

- в JS это значение хранится в константе `Number.MAX_SAFE_INTEGER`

- пример проблемы:

```js
const largeValueA = 9007199254740992;
const largeValueB = 9007199254740993;

console.log(largeValueA === largeValueB); // true, хотя числа разные, но так как JS не может точно хранить второе число, значения округляются до максимально возможного
```

#### проверка на "безопасное число"

- в JS есть метод `Number.isSafeInteger()`:

```js
const firstCheckValue = 9007199254740991;
const secondCheckValue = 9007199254740992;

console.log(Number.isSafeInteger(firstCheckValue)); // true
console.log(Number.isSafeInteger(secondCheckValue)); // false
```

#### решение проблемы

- если нужно очень большое число, используют тип `bigint`

```js
const largePopulationValue = 9007199254740993n; // такое число теперь хранится точно, без потери точности

console.log(largePopulationValue);
```

### boolean

- это логический тип, который может иметь 2 значения - true/false

### undefined

- это значение по умолчанию, если переменной ничего не присвоили

### null

- означает, что значение отсутствует специально

### symbol

- это специальный тип для уникальных идентификаторов

```js
const uniqueUserKey = Symbol('userKey');
const uniqueOrderKey = Symbol('orderKey');
```

- каждый символ уникален:

```js
Symbol('id') === Symbol('id'); // false
```

## 2. объекты (object) (ссылочный тип)

- все сложные структуры - это `object`:
  - Object
  - Array
  - Function
  - Date
  - Map
  - Set

- примеры:

```js
const developerProfile = {
  userName: 'Alex',
  experienceYears: 5,
};

const frameworks = ['React', 'Vue', 'Svelte'];

function calculatePrice() {
  return 100;
}
```

⚠️ но важно:

```js
typeof frameworks === 'object';
typeof calculatePrice === 'function';
```

## преобразование типов

- type conversion - это когда JS превращает один тип в другой
- есть 2 вида:
  1. автоматическое (implicit conversion)
  2. явное (explicit conversion)

### implicit conversion

```js
const resultSum = '5' + 3; // '53' - число 3 преобразовалось в сроку '3'

const calculationResult = '6' - 2; // 4 - строка '6' преобразовалась в число 6

const booleanCheck = '0' == 0; // true - строка '0' преобразовалась в число 0
```

⚠️ именно поэтому оператор `==` считается опасным, лучше использовать `===`

### explicit conversion

- это когда мы сами преобразуем тип

```js
// String
const userAgeNumber = 25;
const userAgeString = String(userAgeNumber);

// Number
const priceStringValue = '100';
const priceNumberValue = Number(priceStringValue);

// Boolean
const convertedBooleanValue = Boolean('hello'); // true
```

### falsy values

- все значение преобразуются в true автоматически, кроме:
  - false
  - 0
  - -0
  - 0n
  - ''
  - null
  - undefined
  - Nan

### оператор `typeof`

- возвращает тип значение

```js
const cityName = 'Amsterdam';

console.log(typeof cityName); // string

const userPermissions = { role: 'admin' };

console.log(userPermissions); // object
```

⚠️ очень важные странности `typeof`

```js
console.log(typeof null); // object - это исторический баг JS

console.log(typeof ['js', 'react']); // object

// чтобы проверить, является ли объект массивом, используется метод Array.isArray():
console.log(Array.isArray(['js', 'react'])); // true

function generateId() {}
console.log(typeof generateId); // function
```
