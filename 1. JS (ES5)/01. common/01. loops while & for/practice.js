// 🟢 Уровень 1 — База (разогрев)

// 1️⃣ Вывести числа от 1 до 10

// Использовать for
// Использовать while

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

let j = 1;
while (j <= 10) {
  console.log(j);
  j++;
}

// 2️⃣ Вывести только нечётные числа от 1 до 20

for (let k = 1; k <= 20; k++) {
  if (k % 2 === 0) {
    continue;
  } else {
    console.log(k);
  }
}

// 3️⃣ Обратный порядок: Вывести числа от 10 до 1 включительно.

for (let l = 10; l >= 1; l--) {
  console.log(l);
}

// 4️⃣ do...while
// Написать пример, где:
// условие изначально false
// но тело цикла выполнится 1 раз

let m = 10;
do {
  console.log(m);
} while (m > 10);


// 🟡 Уровень 2 — Работа с break / continue

// 5️⃣ Остановка по условию

// Вывести числа от 1 до 100,
// но остановиться, когда встретится число 37.

for (let n = 1; n <= 100; n++) {
  console.log(n);
  if (n === 37) {
    break;
  }
}

// 6️⃣ Пропуск значений

// Вывести числа от 1 до 20,
// пропуская: все числа, кратные 3

for (let p = 1; p <= 20; p++) {
  if (p % 3 === 0) {
    continue;
  }
  console.log(p);
}

// 7️⃣ Найти первое число

// В массиве:
const numbers = [5, 12, 8, 130, 44];

// С помощью цикла: найти первое число больше 10, остановить цикл, когда нашли
// (не использовать find, только цикл)

for (let q = 0; q < numbers.length; q++) {
  if (numbers[q] > 10) {
    console.log(numbers[q]);
    break;
  }
}

// 🔵 Уровень 3 — Вложенные циклы
// 8️⃣ Таблица умножения 1–5

// Вывести:
//
// 1*1=1
// 1*2=2
// ...
// 5*5=25

for (let r = 1; r <= 5; r++) {
  for (let s = 1; s <= 5; s++) {
    console.log(`${r} * ${s} = ${r * s}`);
  }
}

// 9️⃣ Нарисовать "пирамиду"

// Вывести:

// *
// **
// ***
// ****
// *****

// let stars = '*';
// for (let t = 0; t <= 5; t++) {
//   console.log(stars);
//   stars += '*';
// }

for (let t = 0; t <= 5; t++) {
  let stars = '';
  for (let u = 0; u <= t; u++) {
    stars += '*';
  }
  console.log(stars);
}

// 🔴 Уровень 4 — var vs let (ловушка собеседований)
// 1️⃣0️⃣ Что выведет код?
for (var v = 0; v < 3; v++) {
  setTimeout(() => console.log(v), 0);
}


// Объясни почему.

// код выведет три раза "3", потому что в каждой итерации создастся таймер, потом переменная i три раза увеличится на 1, то есть до 3, а потом в консоль выведутся значения переменной i (три тройки)

// 1️⃣1️⃣ Исправить код, чтобы выводилось:
// 0
// 1
// 2
//Без использования let.

for (var w = 0; w < 3; w++) {
  setTimeout(() => {
    console.log(w);
  }, 0);
}

// Правильное решение через IIFE (классический ES5 способ):

for (var a = 0; a < 3; a++) {
  (function (x) {
    setTimeout(() => {
      console.log(x);
    }, 0);
  })(a);
}


// Что происходит:
// IIFE создаёт новую область видимости
// x получает копию i
// каждая итерация имеет своё значение


// 1️⃣2️⃣ Доступ к переменной

// Что выведет?

for (var ii = 0; ii < 3; ii++) { }
console.log(ii);

// выведет 3, переменная i доступна вне цикла

for (let jj = 0; jj < 3; jj++) { }
// console.log(jj);

// будет ошибка, переменная j доступна только в цикле


// ⚫ Уровень 5 — Почти реальное собеседование

// 1️⃣3️⃣ FizzBuzz
// Вывести числа от 1 до 50, но:
// если число кратно 3 → "Fizz"
// кратно 5 → "Buzz"
// кратно и 3 и 5 → "FizzBuzz"

for (let number = 1; number <= 50; number++) {
  if (number % 3 === 0 && number % 5 === 0) {
    console.log('FizzBuzz');
  } else if (number % 5 === 0) {
    console.log('Buzz');
  } else if (number % 3 === 0) {
    console.log('Fizz');
  } else {
    console.log(number);
  }
}

// 1️⃣4️⃣ Проверка на простое число

// Написать функцию, которая проверяет, является ли число простым (использовать цикл).

// const isPrimeNumber = (number) => {
//   let isPrime;
//   for (let index = 2; index < number; index++) {
//     if (number % index === 0) {
//       isPrime = false;
//       break;
//     } else {
//       isPrime = true;
//     }
//   }
//   console.log(isPrime);
// };

function isPrimeNumber(number) {
  if (number <= 1) return false;

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const isPrime = isPrimeNumber(121);

console.log(isPrime);
