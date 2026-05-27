## hoisting

- это поведение JS, при котором объявление переменных и функций "поднимаются" вверх своей области видимости во время фазы создания (creation phase)

⚠️ поднимаются не строки кода, а объявления

```js
console.log(a);
var a = 5;
```

- вместо ошибки будет `undefined`, потому что объявление переменной поднимается, а присвоение остаётся на месте
- JS интерпретирует код примерно так:

```js
var a;
console.log(a); // undefined
a = 5;
```

## 2. `var` hoisting

- `var` поднимается и **инициализируется** значением `undefined`

```js
console.log(a); // undefined

var a = 10;

console.log(a); //10
```

- движок это видит так:

```js
var a = undefined;
console.log(a);
a = 10;
console.log(a);
```

## 3. `let` & `const` hoisting

- они тоже поднимаются, но **не инициализируются**
- поэтому появляется Temporal Dead Zone (TDZ)

```js
console.log(a); //ReferenceError: Cannot access 'a' before initialization
let a = 5;
```

## hoisting функций

### function declaration

- функции, объявленные так, поднимаются и инициализируются, то есть такие функции поднимаются полностью

```js
sayHello();

function sayHello() {
  console.log('Hello');
}
```

- JS видит это примерно так:

```js
function sayHello() {
  console.log('Hello');
}

sayHello();
```

### function expression

```js
sayHello(); // TypeError: sayHello is not a function

var sayHello = function () {
  console.log('Hello');
};
```

- такой код приведёт к ошибке, потому что переменная `sayHello` поднимается и инициализируется значением `undefined`, то есть ей не присваивается функциональное выражение

- JS видит это примерно так:

```js
var sayHello; // undefined

sayHello(); // undefined();

sayHello = function () {
  console.log('Hello');
};
```

## модель понимания

- JS выполняет код в 2 фазы:

1️⃣ creation phase - создаются переменные, функции и лексические окружения

2️⃣ execution phase - код выполняется строка за строкой

## hoisting внутри функций

- переменные, объявленные внутри функции, поднимаются и инициализируются значением `undefined` в момент вызова этой функции (то есть в момент создания Execution Context функции)

```js
var a = 1;

function test() {
  console.log(a);
  var a = 2;
}

test();
```

1. сначала создаётся глобальный контекст

```js
a = undefined
test = function;
```

2. начинается выполнение кода

```js
a = 1;
test();
```

3. вызывается функция - создаётся execution context функции
4. creation phase функции
   - движок сканирует код функции и находит `var a`
   - создаёт локальную переменную:

   ```js
   var a; //undefined
   ```

   для JS функция теперь выглядит так:

   ```js
   function test() {
     var a; // undefined
     console.log(a);
     a = 2;
   }
   ```

5. execution phase функции
   - теперь код функции выполняется
   ```js
   console.log(a); // a === undefined
   ```

✅ переменные var поднимаются до начала своей функции

✅ `var` имеет `function scope`, а не `block scope`

- поэтому блоки if, for, while, {} не создают область видимости для `var`

_Переменные var поднимаются (hoisted) в начало своей области видимости._

_Для var область видимости — это функция._

✅ Вывод

- Hoisting поднимает только объявления var, а не присваивания.

- Локальная переменная создаётся в начале функции со значением undefined.

- Присваивание происходит там, где написано в коде.
