# замыкания

- замыкание - это функция, которая запоминает своё лексическое окружение и может использовать переменные из него даже после завершения внешней функции

- проще: функция помнит, где была создана

```js
function createGreeting() {
  let messageText = 'Hello';

  return function () {
    console.log(messageText);
  };
}

let greetFunction = createGreeting();
greetFunction(); // 'Hello'
```

### что происходит:
  1. вызывается функция `createGreeting`
  2. создаётся переменная `messageText`
  3. возвращается внутренняя функция
  4. `createGreeting` завершилась

- но `greetFunction` всё равно выводит 'Hello', потому что лексическое окружение не удаляется

### более точная формулировка

- closure - это комбинация функции и её лексического окружения

### пример с состоянием

```js
function createCounterExample() {
  let countValue = 0;

  return function () {
    countValue++;
    console.log(countValue);
  };
}

let counterOne = createCounterExample();

counterOne(); // 1
counterOne(); // 2
```

- потому что `countValue` сохраняется между вызовами

## 🔥 использование в реальной разработке

- приватные переменные
- инкапсуляция
- state без классов

### пример приватной переменной

```js
function createUserData() {
  let passwordValue = '12345';

  return {
    checkPassword(inputValue) {
      return inputValue === passwordValue;
    }
  };
}

let userInstance = createUserData();

userInstance.checkPassword('12345'); // true
```

- `passwordValue` нельзя получить напрямую
- доступ только через функцию

## ⚠️ конфликты имён

### 1. shadowing

```js
let valueC = 'global';

function testShadow() {
  let valueC = 'local';
  console.log(valueC);
}

testShadow(); // 'local'
```

- внутренняя переменная перекрывает внешнюю

### ⚠️ в замыканиях это тоже важно

```js
function outerLayer() {
  let valueD = 1;

  return function () {
    let valueD = 2;
    console.log(valueD);
  };
}

let fnD = outerLayer();
fnD(); // 2
```

### 2. неочевидный конфликт

```js
function outerLayer2() {
  let valueE = 1;

  return function () {
    console.log(valueE);
  };
}

let fnE = outerLayer2();

let valueE = 100;

fnE(); // 1
```

- замыкание берёт значение из места создания, а не из текущего scope

### конфликт с `var`

```js
function testVarConflict() {
  for (var indexValue = 0; indexValue < 3; indexValue++) {
    setTimeout(function () {
      console.log(indexValue);
    }, 100);
  }
}

testVarConflict(); // 3, 3, 3
```

- один `indexValue` на всю функцию
- все функции замыкают одну переменную

- решение - использование `let`, потому что `let` создаёт новое окружение ни каждой итерации



## 💥 Частая формулировка на собесе

- Замыкание — это функция, которая имеет доступ к переменным из своей внешней области видимости даже после того, как эта область была завершена.