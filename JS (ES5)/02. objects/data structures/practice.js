// #1 stack

// есть строка
const string = '([]{})';

// нужно проверить, правильная ли последовательность скобок
// правила: каждая открывающая скобка должна закрываться в правильном порядке, последняя открытая закрывается первой

// 1. создаём стэк
const stack = [];

// 2. проходим по каждому символу строки: 
//  если открывающая скобка -> кладём в стэк, 
//  если закрывающая -> проверяем верх стека: 
//    если верх совпадает с открывающей -> удаляем верх, 
//    если нет -> ошибка

const pairs = {
  ')': '(',
  ']': '[',
  '}': '{',
};

for (let char of string) {
  if (['(', '[', '{'].includes(char)) {
    stack.push(char); // кладём в стэк
    console.log(stack);
  } else if ([')', ']', '}'].includes(char)) {
    if (stack.pop() !== pairs[char]) {
      console.log('неправильная последовательность');
    }
  }
}

console.log(stack.length === 0
  ? 'все скобки закрыты'
  : 'есть незакрытые скобки'
);

// #2 queue
// задача - реализовать простую очередь
// нужно сделать простую очередь у которой есть две операции enqueue и dequeue и хранить элементы в массиве
// пусть есть объект queueManager
// 1 нужно добавить метод enqueue, который добавляет элемент в очередь
// 2 метод dequeue, который удаляет первый элемент из очереди

const queueManager = {
  items: [], // здесь будут храниться элементы очереди
  enqueue(value) {
    this.items.push(value); // метод добавления элемента в очередь
  },
  dequeue() {
    return this.items.shift(); // метод удаления элементы из очереди
  }
};

// # очередь обработки заказов

const ordersQueue = {
  items: [],
  enqueue(value) {
    this.items.push(value);
  },
  dequeue() {
    return this.items.shift();
  }
};

// в очередь поступают заказы 'order1', 'order2', 'order3'
// Первый заказ обрабатывается (dequeue)
// В очередь поступает новый заказ 'order4'
// Второй заказ обрабатывается (dequeue)

console.log(ordersQueue.items); // ['order3', 'order4']

// #3 tree

const ordersTree = {
  value: 'Root',
  children: [
    {
      value: 'Order1',
      children: [
        { value: 'Order1.1', children: [] },
        { value: 'Order1.2', children: [] }
      ]
    },
    {
      value: 'Order2',
      children: []
    }
  ]
};

// написать функцию, которая возвращает общее количество узлов

const countNodes = (node) => {
  let count = 1; // начинаем с узла -> считаем его за `1`

  node.children.forEach((child) => {
    count += countNodes(child); // добавляем количество дочерних узлов
  });

  return count;
};

console.log(countNodes(ordersTree)); // 5

// #4 graph

const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C']
};

// A = 0, B = 1, C = 2, D = 3
const adjacencyMatrix = [
  [0, 1, 1, 0], // A
  [1, 0, 0, 1], // B
  [1, 0, 0, 1], // C
  [0, 1, 1, 0], // D
];

// DFS обход графа

const dfs = (graph, start, visited = new Set()) => {
  console.log(start);
  visited.add(start);

  graph[start].forEach((neighbor) => {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  });
};

dfs(graph, 'A');

const bfs = (graph, start) => {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      console.log(node);
      visited.add(node);
      graph[node].forEach((neighbor) => {
        queue.push(neighbor);
      });
    }
  }
};

bfs(graph, 'A');

// #7. hash table

const userAge = {
  'Alice': 25,
  'Bob': 30,
  'Charlie': 28
};

console.log(userAge['Alice']); // 25
userAge['David'] = 32;
delete userAge['Bob'];

const userMap = new Map();

userMap.set('Alice', 25);
userMap.set('Bob', 30);

console.log(userMap.get('Alice')); // 25
userMap.delete('Bob'); // удаляем

// посчитать, сколько раз встречается каждое слово в массиве

const words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = {};

for (const word of words) {
  if (count[word]) {
    count[word] += 1;
  } else {
    count[word] = 1;
  }
}

console.log(count); // { apple: 3, banana: 2, orange: 1 }