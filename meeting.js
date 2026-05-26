// Однопоточность - сервис воркеры / веб воркеры
// ECMAscript
// string, number, boolean, undefined, null, symbol, object, bigint

// Методы копирование объектов. Какая разница, какие данные не копируются в разных методах
// Глубокое / поверхностное копирование

// хип / стек - почитай 

// правила приведения типов

// console.log(true + false) // NaN
// console.log(12 / "6") // 2
// console.log("number" + 15 + 3) // number153
// console.log(15 + 3 + "number") //18number
// console.log([1] > null) // true
// console.log("foo" + + "bar") // NaN
// console.log('true' == true) // true
// console.log(false == 'false') // false
// console.log(null == '') // false
// console.log(!!"false" == !!"true") // true
// console.log(["x"] == "x") // true
// console.log([] + null + 1) // [objectObject]1
// console.log(0 || "0" && {}) // [objectObject]
// console.log([1,2,3] == [1,2,3]) // false
// console.log({}+[]+{}+[1]) // [objectObject][objectObject]1 || 'Object object1'
// console.log(!+[]+[]+![]) // true + '' + true || 'truefalse'
// console.log(new Date(0) - 0)
// console.log(new Date(0) + 0)
// console.log(7/0) // Infinity

// https://habr.com/ru/articles/709048/
// https://habr.com/ru/companies/ruvds/articles/347866/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence


// Автобоксинг
// 'ПРивет'.toUpperCase();

//for, while, doWhie

// var - функциональная 
// let - блочная 
// const - блочная 

// !! TDZ 

// КОНТЕКСТ
// КОГДА ПРИВЯЗЫВАЕТСЯ КОНТЕКСТ К КАКОЙ ФУНКЦИИ

// function foo() {
//   const x = 10;
//   return {
//     x: 20,
//     bar: () => {
//       console.log(this.x);
//     },
//     baz: function() {
//       console.log(this.x);
//     }
//   }
// }

// const obj1 = foo();
// obj1.bar(); // 10 - контекст теряется
// obj1.baz(); // 20

// const obj2 = foo.call({x: 30});
// obj2.bar(); // 30
// obj2.baz(); // 20
// --------------------------------------------------------

// function foo() {
//   foo.x = 30;
//   const {x} = foo;
//   console.log(x)
// }

// foo.x = 10;

// foo.call(foo, 20);

// --------------------------------------------------------

// const foo = () => {
//   console.log(this.prop);
// }

// const obj = {
//   prop: 1,
  
//   m1() {
//     console.log(this.prop);
//   },

//   m2(foo) {
//     foo();
//   },

//   m3() {
//     const foo = () => {
//       console.log(this.prop);
//     }
//     foo();
//   },

//   m4: foo,

//   m5() {
//     foo();
//   },
// };

// obj.m1(); // 1
// obj.m2(foo); // undefined
// obj.m3(); // 1
// obj.m4(); // undefined
// obj.m5(); // undefined

//  --------------------------------------------------------
// ЗАМЫКАНИЯ
//  --------------------------------------------------------
// var a = 1;
    
// function foo() {
//   console.log(a);
// }
    
// function bar() {
//   console.log(a);
//   var a = 2;
//   foo();
//  }   
 
//  bar(); // undefined 1

// --------------------------------------------------------

// function createCounter() {
//     let count = 0;
//     return function () {
//         // console.log(count++)
//         console.log(++count)
//     }
// }

// const counter = createCounter();

// counter();
// counter();

// --------------------------------------------------------

    
// const b = 2;
// function f() {
//     console.log(b); // 2
// }
// const a = f();


// console.log(a) // 2

// --------------------------------------------------------

// function f() {
//   for (let i = 0; i <= 5; i++) {
//     setTimeout(() => {
//     console.log(i);
//     }, 0);
//   }
// }

// f();

    // function f(){
    
    // for (var i = 0; i <= 5; i++) {
    
    // setTimeout((j) => {
    
    // console.log(j);
    
    // }, 0, i)
    
    // }
    
    // }
    
    // f();
    
    // function f() {
    
    // for (var i = 0; i < 5; i++) {
    
    // setTimeout(
    
    // function (j) {
    
    // console.log(j);
    
    // }.bind({}, i),
    
    // 0
    
    // );
    
    // }
    
    // }
    
    // f();
    
// --------------------------------------------------------
// EVENT LOOP
// --------------------------------------------------------

// console.log("1");

// setTimeout(() => console.log("2"), 1);

// let promise = new Promise((resolve) => {
//  console.log("3");
//  resolve();
// });

// promise.then(() => console.log("4"));
// setTimeout(() => console.log("5"));
// console.log("6");

// 1 3 6 4 2 5

// --------------------------------------------------------

// const myPromise = Promise.resolve(
//     Promise.resolve("Promise!")
// );

// function funcOne() {

// myPromise

// .then((res) => res)

// .then((res) => console.log(res, "Результат funcOne"));

// console.log("Last line! 1");

// }

// async function funcTwo() {

// const res = await myPromise;

// console.log(res, "Результат funcTwo");

// console.log("Last line! 2");

// }

// funcOne();

// funcTwo();

// Last line! 1
// Promise
// Результат funcTwo
// Результат funcOne
// Last line! 2

// --------------------------------------------------------
async function a() {
  console.log('a');
}

console.log('1');
(async function() {
  console.log('f1');
  await a();
  console.log('f2');
})();

console.log('2')

// 1 f1 2 a f2
