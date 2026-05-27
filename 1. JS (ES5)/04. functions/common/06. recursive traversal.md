# рекурсивный обход

- это когда функция сама себя вызывает для обработки вложенных структур данных (например, объектов или массивов)

- например:
  - есть объект, в котором могут быть другие объекты
  - мы хотим пройтись по всем ключам и обработать все значения, даже если они вложены
  - вместо того, чтобы писать бесконечные `for` циклы для каждой вложенности, мы используем рекурсию: функция вызывает сама себя на каждом вложенном объекте

```js
const user = {
  name: 'Alex',
  age: 30,
  address: {
    city: 'Moscow',
    zip: 101000,
  },
  skills: {
    programming: {
      js: 'advanced',
      ts: 'intermediate',
    },
    design: 'basic',
  },
};
```

- рекурсивная функция обхода объекта

```js
function traverse(obj) {
  for (let key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      traverse(value);
    } else {
      console.log(key, ':', value);
    }
  }
}

traverse(user);
```

### что происходит:

1. функция `traverse` берёт объект obj
2. для каждого ключа проверяет, объект это или нет
3. если объект - вызываем `traverse(value)` -> рекурсивный вызов
4. если не объект - выводим значение в консоль

```
name : Alex
age : 30
city : Moscow
zip : 101000
js : advanced
ts : intermediate
design : basic
```

- то есть мы прошлись по всем ключам, независимо от глубины вложенности

- иногда полезно видеть путь до значения, например `skills.programming.js`

```js
function traverseWithPath(obj, path = '') {
  for (let key in obj) {
    const value = obj[key];
    const newPath = path ? `${path}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      traverseWithPath(value, newPath);
    } else {
      console.log(newPath, ':', value);
    }
  }
}

traverseWithPath(user);
```

```
name : Alex
age : 30
address.city : Moscow
address.zip : 101000
skills.programming.js : advanced
skills.programming.ts : intermediate
skills.design : basic
```
