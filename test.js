const numbers = [1, 2, 3];

const addNumber = (arr, num) => {
  return [...arr, num];
};

const newNumbers = addNumber(numbers, 4);

console.log(numbers); // [1, 2, 3]
console.log(newNumbers); // [1, 2, 3, 4]