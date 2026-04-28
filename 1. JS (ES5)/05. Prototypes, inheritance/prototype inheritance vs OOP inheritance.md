# прототипное наследование и ООП-наследование

## 1. ООП-наследование (классическое)

- используется в Java, C++, C#, Python

- есть классы:

```js
class AnimalClass {
  makeSound() {
    console.log('sound');
  }
}

class DogClass extends AnimalClass {
  bark() {
    console.log('woof');
  }
}
```

- объект создаётся из класса

`Dog -> наследует -> Animal`

### особенности

- строгая структура
- есть "чертёж" (class)
- наследование через `extends`
- часто: инкапсуляция, полиморфизм итд

## 2. прототипное наследование

- объекты наследуют напрямую от других объектов

```js
const animalObject = {
  makeSound() {
    console.log('sound');
  },
};

const dogObject = Object.create(animalObject);

dogObject.bark = function () {
  console.log('woof');
};
```

### идея

- нет классов (исторически)

`dogObject -> animalObject -> Object.prototype`

## важный момент про JS

- в JS нет настоящих классов

```js
class UserClass {}
```

- на самом деле:

```js
UserClass.prototype;
```

- то есть `class` - это просто синтаксический сахар над прототипами

### как объяснить это на собеседовании:

- "JavaScript использует прототипное наследование, где объекты наследуют напрямую от других объектов через prototype chain. Классы в JavaScript — это синтаксический сахар над этой моделью."

## гибкость прототипов

- в JS можно:

```js
const base = {
  value: 1;
}

const obj = Object.create(base);

Object.setPrototypeOf(obj, {
  value: 100
})
```

- в классическом ООП так нельзя (или очень сложно)

## почему это важно для фронтенда

- потому что:
  - всё в JS - объекты
  - даже функции используют прототипы
  - классы в React/NextJS - это просто обёртка

## когда что использовать

- в реальной жизни использовать классы (для читаемости)
- прототипы -> под капотом

## самое важное

- в JS
  - нет копирования поведения
  - есть делегирование через `prototype chain`

### пример

```js
const baseUser = {
  sayHi() {
    console.log('Hi');
  },
};

const userObject = Object.create(baseUser);
```

- объект не копирует `sayHi`
- он делегирует вызов вверх по цепочке

## частая ошибка

- "объект наследует методы" -> "объект делегирует доступ к методам через `prototype chain`