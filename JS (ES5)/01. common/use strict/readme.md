# "use strict"

- это строгий режим JS
- он меняет поведение JS так, чтобы
  1. легче ловить ошибки
  2. исключать небезопасные или странные конструкции языка
- можно включить для всего скрипта:

```js
'use strict';
// весь код
```

- можно включить для одной функции:

```js
function example() {
  'use strict';
  // только внутри этой функции строгий режим
}
```

2️⃣ основные изменения в строгом режиме

особенность | обычный JS | строгий режим |

1. неявное создание глобальных переменных | разрешено | ❌ ReferenceError

2. дублирование имён параметров функции | разрешено | ошибка

3. `this` в функциях | this = window (глобальный объект) | this = undefined

4. удаление "нельзя удалить" | silently ignored | ошибка

5. использование зарезервированных слов | разрешено | ошибка

## примеры

### пример с неявной глобальной переменной

```js
function example() {
  a = 10; // без var/let/const
  console.log(a);
}

example(); // 10, создаётся глобальная a
console.log(a); // 10 — глобально
```

```js
'use strict';

function example() {
  a = 10; // ❌ ReferenceError: a is not defined
  console.log(a);
}

example();
```

### пример с `this`

```js
function showThis() {
  console.log(this);
}

showThis(); // window (в браузере)
```

```js
'use strict';

function showThis() {
  console.log(this);
}

showThis(); // undefined
```

### пример с дублированием параметров

```js
function sum(a, a) {
  return a + a;
}

console.log(sum(1, 2)); // 3, обычный JS
```

```js
'use strict';

function sum(a, a) {
  // ❌ SyntaxError: duplicate parameter name
  return a + a;
}
```

3️⃣ когда использовать `"use strict"`

1. везде в современном коде
2. внутри функций - если нужно строгое поведение только локально
3. NodeJS и современные сборщики часто используют строгий режим автоматически в модулях ES
