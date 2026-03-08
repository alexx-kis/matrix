# геттеры и сеттеры объектов

- это специальные методы объекта, которые позволяют контролировать чтение и запись свойства
  - getter - вызывается, когда свойство читают
  - setter - вызывается, когда свойству присваивают значение

- то есть свойство выглядит, как обычное поле, но под капотом выполняется функция

## 1. пример

```js
const user = {
  firstName: 'Alex',
  lastName: 'Smith',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(user.fullName); // Alex Smith
```

- но мы не вызываем функцию `user.fullName()`, а пишем, как обычное свойство `user.fullName`, хотя на самом деле это функция getter

## 2. как работает getter

- когда выполняется `user.fullName`, JS делает примерно следующее:

```
если свойство имеет `getter` -> вызвать функцию `getter` -> вернуть результат
```

## 3. setter - когда присваиваем значение

- теперь добавим setter

```js
const user = {
  firstName: '',
  lastName: '',

  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

user.fullName = 'Alex Smith';

console.log(user.firstName); // Alex
console.log(user.lastName); // Smith
```

- что произошло:

```
user.fullName = 'Alex Smith'; -> вызвался setter -> set fullName(value)
```

## 4. getter + setter вместе

- обычно их используют парой

```js
const user = {
  firstName: 'Alex',
  lastName: 'Smith',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
};

console.log(user.fullName); // Alex Smith

user.fullName = 'John Doe';

console.log(user.firstName); // John
console.log(user.lastName); // Doe
```

## 5. зачем они нужны (главный смысл)

- они позволяют:
  1. скрывать внутреннюю логику: `user.fullName` вместо `user.getFullName()`
  2. делать вычисляемые свойства:

  ```js
  const rectangle = {
   width =  10,
   height = 5,
   get area() {
     return this.width * this.height;
   }
  }
  console.log(rectangle.area); //50
  // свойства `area` в объекте нет, оно вычисляется каждый раз
  ```

  3. валидировать данные

  ```js
  const user = {
    _age: 0,
    set age(value) {
      if (value < 0) {
        console.log('age cannot be negative');
        return;
      }
      this._age = value;
    },
    get age() {
      return this._age;
    },
  };
  user.age = -5; // age cannot be negative user.age = 25;
  console.log(user.age); // 25
  ```

## 6. почему используется `_age`

- это условно приватное поле
- иначе будет рекурсия

### плохой пример:

```js
const user = {
  age: 0,
  set age(value) {
    this.age = value;
  },
};

user.age = 25;
```

- что произойдёт:

```
set age
↓
this.age = value
↓
set age
↓
this.age = value
↓
∞
```

- бесконечный цикл -> поэтому используют другое поле `_age`

## 7. getter без setter (read-only)

- можно сделать свойство только для чтения:

```js
const user = {
  firstName: 'Alex',
  lastName: 'Smith',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

user.fullName = 'John Doe';

console.log(user.fullName); // Alex Smith
```

- setter отсутствует -> значение не изменится

⚠️ в строгом режиме будет ошибка!

```
TypeError: Cannot set property value of #<Object> which has only a getter
```

## 9. можно создать геттер и сеттер через метод `defineProperty()` глобального объекта `Object`

```js
const user = {
  firstName: 'Alex',
  lastName: 'Smith',
};

Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
});

console.log(user.fullName); // Alex Smith
```

❌ getter нельзя вызвать, как функцию:

`user.fullName()` -> `user.fullName`
