# свойства `__proto__` и `prototype`

## 1. общая идея

- в JS есть наследование через прототипы
- каждый объект может наследовать свойства от другого объекта
- связь выглядит так:

```
object -> object -> object -> null
```

- это называется prototype chain (цепочка прототипов)

## 2. `__proto__`

- это ссылка на прототип объекта
- это скрытая ссылка, которая говорит: "у кого этот объект наследует свойства"

## пример

```js
const baseUser = {
  canLogin: true,
};
const adminUser = {
  canDelete: true,
};

adminUser.__proto__ = baseUser;

console.log(adminUser.canLogin); // true
```

- как это работает

```js
adminUser.canLogin;
```

1. JS ищет `canLogin` в `adminUser` -> не находит
2. идёт в `adminUser.__proto__` -> `baseUser` -> находит

### важно

- `__proto__` есть у каждого объекта

- но `__proto__` - это устаревший способ (legacy), лучше использовать`Object.getPrototypeOf()`

## 3. `prototype` - это совсем другое

- это свойство функции-конструктора, оно определяет, какой объект станет `__proto__` у новых объектов

### пример

```js
function Car(modelName) {
  this.modelName = modelName;
}

Car.prototype.showModel = function () {
  console.log(this.modelName);
};

const CarInstance = new Car('BMW');
```

- что происходит при `new`

1. JS создаёт новый объект

```js
const carInstance = {};
```

2. устанавливает

```js
carInstance.__proto__ = Car.prototype;
```

3. вызывает функцию

```js
Car.call(carInstance, 'BMW');
```

4. итог

```js
carInstance.__proto__ === Car.prototype; // true
```

## 4. ключевое различие

```
                      `__proto__`           `prototype`

где находится         у объекта             у функции
что хранит            ссылку на прототип    объект для будущих экземпляров
когда используется    при поиске свойств    при создании объектов (`new`)
```

## 5. связка (самое важное)

```js
function Animal(typeName) {
  this.typeName = typeName;
}

const dogInstance = new Animal('dog');
```

- связь:

`dogInstance.__proto__ === Animal.prototype`

## 6. визуализация

```
dogInstance
   ↓ __proto__
Animal.prototype
   ↓ __proto__
Object.prototype
   ↓ __proto__
null
```

## 7. почему это важно

- благодаря этому работает:
  - наследование
  - методы классов
  - экономия памяти


### пример экономии памяти

