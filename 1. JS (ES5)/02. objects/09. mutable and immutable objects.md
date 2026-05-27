# мутируемые и немутируемые объекты

## 1. mutable (изменяемый) объект

- это объект, который можно изменять после создания
- пример: обычный объект `{}` или массив `[]`
- любые изменения влияют на тот же объект в памяти, а не создают новый

```js
const obj = { name: 'Alex' };
obj.name = 'Bob';
console.log(obj); // { name: 'Bob' }

const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

✅ объект остаётся тем же, но меняются его свойства/состояние

## 2. immutable (неизменяемый) объект

- объект, который нельзя изменить после создания
- любое изменение создаёт новый объект, старый остаётся прежним
- в JS примитивы по сути immutable

✅ оригинал не трогаем, изменения дают новый объект

## 3. почему это важно

- mutable объекты могут вызывать баги, если случайно изменить состояние напрямую

```js
const state = { counter: 0 };
const increment = () => {
  state.counter++; // мутируем напрямую
};
increment();
console.log(state.counter); //1
```

- в react такой код опасен, потому что react может не отследить изменения состояния

- immutable объекты помогают:
  - легче отлаживать (можно сравнить старое и новое состояние)
  - предотвращают неожиданные побочные эффекты
  - работают с `shouldComponentUpdate`, `PureComponent`, `React.memo()`

```js
const state = { counter: 0 };
const newState = { ...state, counter: state.counter + 1 };
console.log(state); // { counter: 0 }
console.log(newState); // { counter:1 }
```

## 4. как сделать объект immutable

1. `Object.freeze()` - поверхностная заморозка объекта

```js
const obj = { name: 'Alex' };
Object.freeze(obj);
obj.name = 'Bob'; // не сработает
console.log(obj.name); // 'Alex'
```

⚠️ но свойства вложенных объектов всё ещё можно менять:

```js
const obj = {
  person: {
    name: 'Alex',
  },
};
Object.freeze(obj);
obj.person.name = 'Bob'; // сработает
console.log(obj.person.name); // 'Bob'
```

2. глубокая заморозка

- для этого нужно написать рекурсивную функцию, которая будет проходить по каждому свойству объекта, проверять, является ли свойство вложенным объектом, и если да - замораживать его:

```js
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
};
const obj = {
  person: {
    name: 'Alex',
  },
};
deepFreeze(obj);
obj.person.name = 'Bob'; // не сработает
```

3. иммутабельные операции

- используем `spread` для объектов и массивов
- не меняем исходный объект, а создаём новый

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // новый массив
console.log(arr); // [1, 2, 3]
console.log(newArr); // [1, 2, 3, 4]

const obj = {
  a: 1,
  b: 2,
};
const newObj = { ...obj, b: 3 };
console.log(obj); // { a:1, b:2 }
console.log(newObj); // { a:1, b:3 }
```

5. mutable и immutable в функциональном стиле

- функциональное программирование предпочитает immutable, потому что это делает код предсказуемым:

```js
const numbers = [1, 2, 3];

const addNumber = (arr, num) => {
  return [...arr, num];
};

const newNumbers = addNumber(numbers, 4);

console.log(numbers); // [1, 2, 3]
console.log(newNumbers); // [1, 2, 3, 4]
```
