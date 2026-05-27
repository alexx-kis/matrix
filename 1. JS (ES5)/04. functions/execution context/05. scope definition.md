# scope (область видимости)

- это область в коде, где переменная доступна (где я могу использовать эту переменную)

- lexical environment - где хранится
- scope - где доступно

## виды scope

### 1. global scope (глобальная область)

```js
let globalName = 'Alex';

function showName() {
  console.log(globalName);
}
```
- `globalName` доступна везде

#### особенности

- создаётся при запуске скрипта
- доступна во всех функциях
- в браузере привязана к `window` (но не всегда!)

### 2. function scope (функциональная область)

```js
function printAge() {
  let ageValue = 25;
  console.log(ageValue);
}

printAge();
```

- `ageValue` доступна только внутри функции

⚠️ `var` имеет function scope, а не block scope

### 3. block scope (блочная область)

```js
if (true) {
  let cityValue = 'Berlin';
  const countryValue = 'Germany';
}

console.log(cityValue);   // ❌
console.log(countryValue); // ❌
```

- `let` и `const` доступны только внутри {}

- а вот `var`:

```js
if (true) {
  var testValue = 123;
}

console.log(testValue); // ✅
```

- потому что `var` игнорирует блоки

### 🔥 важно

`var`:
  - function scope
  - hoisting
  - может привести к багам

`let/const`:
  - block scope
  - безопаснее


## scope chain

```js
let a = 1;

function outer() {
  let b = 2;

  function inner() {
    console.log(a, b);
  }

  inner();
}
```

- поиск переменных: inner -> outer -> global

## shadowing (перекрытие переменных)

```js
let valueZ = 1;

function testScope() {
  let valueZ = 2;
  console.log(valueZ);
}

testScope(); // 2 - внутренняя переменная перекрывает внешнюю
```

- это не изменение переменной, это другая переменная с тем же именем

## temporal dead zone (TDZ)

```js
{
  console.log(testValue); // ошибка
  let testValue = 5
}
```

- переменная есть, но ещё не доступна
- `let` и `const` создаются сразу, но инициализируются позже

## примеры

```js
let valueA = 1;

function outerFunction() {
  let valueA = 2;

  if (true) {
    let valueA = 3;
    console.log(valueA);
  }

  console.log(valueA);
}

outerFunction();
console.log(valueA);
```

- ответ: 3, 2, 1. сначала создаётся переменная valueA=1. потом объявляется функция outerFunction. затем вызывается функция outerFunction, в ней создаётся переменная valueA=2. затем условие, в котором создаётся переменная valueA=3 и вывод в консоль переменной valueA, она ищется сначала в текущем scope, находится и выводится в консоль (3). затем вывод в консоль переменной valueA, она ищется в текущем scope (функции), находится и выводится (2). переменная, объявленная внутри условия не доступна вне него. функция закончилась. затем выводится valueA, поиск в текущем scope (глобальный), там valueA=1. другие valueA недоступны, так как они внутри функции.  

👉 как сказать на собесе:
В коде используются три разных области видимости: глобальная, функциональная и блочная.
Переменная valueA объявляется в каждой из них, создавая разные переменные.
При обращении к переменной JavaScript ищет её в текущем scope и, если не находит, поднимается вверх по цепочке scope (scope chain).
Внутренняя переменная затеняет внешнюю (shadowing), поэтому выводятся значения 3, 2 и 1 соответственно.

```js
let valueB = 1;

function testFunction() {
  console.log(valueB);

  let valueB = 2;
}

testFunction();
```

- ответ: ошибка, потому что переменная valueB внутри функции существует в её lexical environment, но ещё не инициализирована в момент вывода

Как сказать на собесе

👉 как сказать на собесе:
Переменная valueB, объявленная через let, поднимается в лексическое окружение функции, но остаётся неинициализированной до момента объявления. Этот период называется Temporal Dead Zone. При попытке обращения к ней до инициализации возникает ReferenceError, и поиск по scope chain не происходит.