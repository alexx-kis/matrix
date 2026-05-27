# JSON

- это текстовый формат для хранения и обмена данными

- JSON:
  - может хранить объекты, массивы, числа, строки, `true/false` и `null`
  - не может хранить функции, `undefined`, `Symbol`, циклические ссылки, специальные объекты типа `Date`, `Map`, `Set`
  - используется для:
    - обмена данными с сервером (AJAX, fetch API)
    - сохранения состояния в локальном хранилище (`localStorage`)
    - клонирования объектов (с ограничениями)

- пример JSON-строки

```js
const obj = {
  name: 'Alex',
  age: 25,
  isAdmin: true,
  hobbies: ['JS', 'React'],
};

const jsonString = JSON.stringify(obj);
console.log(jsonString); // '{"name":"Alex","age":25,"isAdmin":true,"hobbies":["JS","React"]}'
```

## клонирование объектов через JSON

- идея: превратить объект в строку -> распарсить обратно -> получить новый объект

```js
const original = { a: 1, b: { c: 2 } };

// "глубокое" клонирование
const clone = JSON.parse(JSON.stringify(original));

clone.b.c = 99;

console.log(original.b.c); // 2 — оригинал не изменился
console.log(clone.b.c); // 99 — клонированный объект изменился
```

- нюансы/ограничения:

1. функции, `undefined`, `Symbol` -> пропадут

```js
const obj = { a: 1, b: undefined, c: () => {} };
const clone = JSON.parse(JSON.stringify(obj));
console.log(clone); // { a: 1 }
```

2. специальные объекты теряют тип:

```js
const dateObj = { today: new Date() };
const cloneDate = JSON.parse(JSON.stringify(dateObj));
console.log(cloneDate.today instanceof Date); // false, это теперь строка
```

3. циклические ссылки вызовут ошибку:

```js
const obj = {};
obj.self = obj;
JSON.stringify(obj); // TypeError: Converting circular structure to JSON
```

✅ вывод: JSON-клонирование удобно для простых объектов и массивов, без функций и специальных типов

## преобразование объекта в JSON

- для этого используется метод `JSON.stringify()`

```js
JSON.stringify(value, replacer?, space?)
```

- value - объект/массив/значение
- replacer - функция или массив, которая управляет, какие свойства включать
- space - добавляет отступы дял читаемости

```js
const user = { name: 'Alex', age: 25, password: 'secret' };

// Отфильтруем пароль
const jsonFiltered = JSON.stringify(user, ['name', 'age']);
console.log(jsonFiltered); // '{"name":"Alex","age":25}'

// Используем replacer как функцию
const jsonReplacer = JSON.stringify(user, (key, value) => {
  if (key === 'password') return undefined; // исключаем
  return value;
});
console.log(jsonReplacer); // '{"name":"Alex","age":25}'

// Красивый JSON с отступами
console.log(JSON.stringify(user, null, 2));
/*
{
  "name": "Alex",
  "age": 25,
  "password": "secret"
}
*/
```

## 4. использование `reviver` в `JSON.parse`

- `JSON.parse` может принимать функцию `reviver`, которая позволяет обрабатывать значения при разборе JSON

```js
JSON.parse(text, reviver);
```

- пример

```js
const jsonString = '{"name":"Alex","age":25,"birthday":"2000-01-01T00:00:00.000Z"}';

// Преобразуем birthday из строки в объект Date
const parsed = JSON.parse(jsonString, (key, value) => {
  if (key === 'birthday') return new Date(value);
  return value;
});

console.log(parsed.birthday instanceof Date); // true
console.log(parsed.birthday.getFullYear()); // 2000
```

- используется для восстановления типов, которых нет в JSON (например `Date`) или фильтрации данных при разборе