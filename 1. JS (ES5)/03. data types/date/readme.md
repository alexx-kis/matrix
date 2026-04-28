# объект Date

- в JS для работы с датами используется объект `Date`

```js
const projectStartDate = new Date(); // это создаёт текущую дату и время
```

## получение частей даты (get)

- у объекта `Date` есть специальные методы

```js
projectStartDate.getFullYear(); // возвращает год
projectStartDate.getMonth(); // возвращает номер месяца (нумерация с нуля)
projectStartDate.getDate(); // возвращает день месяца (нумерация с 1)
```

## изменение частей даты (set)

```js
projectStartDate.setFullYear(2030);
projectStartDate.setMonth(0);
projectStartDate.setDate(1);

// 2030-01-01
```

⚠️ методы `set...()` изменяют оригинальный объект, это связано с тем, что `Date` - mutable object

⚠️ `Date` автоматически нормализует значение

```js
const weirdDate = new Date(2024, 0, 32);

console.log(weirdDate); // 2024-02-01, потому что January 32 → February 1 (JS переносит переполнение)
```

## резюме

- месяцы начинаются с 0

```
0 -> January
11 -> February
```

- Date автоматически нормализует значение

```
32 January -> 1 February
```

- day = 0 - последний день предыдущего месяца

```js
new Date(2025, 2, 0); // 28 February 2025
```

## Date parsing

- при создании объекта даты ему можно передать начальное значение в виде строки

```js
const parsedDate = new Date('2024-01-01');
```

- разные форматы могут работать неоднозначно

```js
new Date('01-02-2024'); // формат - американский MM-DD-YYYY, то есть это второе января 2024
// но
new Date('03/04/2024'); // март 4, 2024 - слэши могут интерпретироваться, как локали

new Date('2024-02-01'); // такой формат - это ISO-формат, то есть это первое февраля 2024

new Date(2024, 2, 13); // 13 марта 2024 (месяцы с 0) - конструктор - самый безопасный вариант
```

- таким образом, самый безопасный формат - `YYYY-MM-DD` (только такой формат - через дефис, точки, слэши и другие символы могут изменить поведение `Date`)

- 💡 на интервью часто спрашивают, как создать дату безопасно — правильный ответ:
  - использовать ISO
  - или new Date(year, month, day).

## UTC dates и timezones

### 1. UTC vs Local Time

- local time - это время по часовому поясу пользователя
- UTC - универсальное время, не зависит от часового пояса

```js
const now = new Date();
console.log(now.toString()); // локальное время "Fri Mar 13 2026 13:30:00 GMT+0300 (Moscow Standard Time)"
console.log(now.toUTCString()); // UTC "Fri, 13 Mar 2026 10:30:00 GMT"
console.log(now.toISOString()); // ISO 8601 в UTC "2026-03-13T10:30:00.000Z"
```

### 2. методы для работы с UTC

- `getUTCFullYear()`
- `getUTCMonth()`
- `getUTCDate()`
- `getUTCHours()`, `getUTCMinutes()`, `getUTCSeconds()`

```js
const meeting = new Date('2026-03-13T12:00:00Z');

console.log(meeting.getHours()); // локальное время
console.log(meeting.getUTCHours()); // UTC
```

### 3. проверка часового пояса

```js
const offset = new Date().getTimezoneOffset();
console.log(offset);
```

- возвращает разницу в минутах и локальным временем
- пример для Москвы (UTC+3): -180 минут
- минус означает, что локальное время опережает UTC

🧠 Интервью-хак

- Почему new Date("2026-03-13") может вести себя иначе в разных браузерах?
  - Потому что без времени и с дефисами браузеры иногда интерпретируют как UTC, а иногда как локальное время

- Как перевести дату в UTC?
  - Через getUTC...() или toISOString()

## проверка, что объект - валидная дата

- в JS любой объект может быть создан через `new Date()`, но не все даты корректные

### 1. простейший способ - `isNaN(date)`

```js
const date1 = new Date('2024-03-13'); // валидная
const date2 = new Date('invalid date'); // невалидная
```

- если `date` невалидная, `getTime()` вернёт `NaN`
- `isNaN(date)` проверяет это автоматически

### 2. через `getTime()`

```js
const d = new Date('some string');
if (d.getTime() === d.getTime()) {
  console.log('valid date');
} else {
  console.log('invalid date');
}
```

- здесь мы используем факт, что NaN !== NaN

### 3. мини-утилита для проверки

```js
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

console.log(isValidDate(new Date())); // true
console.log(isValidDate(new Date('abc'))); // false
console.log(isValidDate('2024-03-13')); // false
```
