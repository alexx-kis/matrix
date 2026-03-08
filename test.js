"use strict";

const obj = {
  get value() {
    return 10;
  }
};

obj.value = 50;

console.log(obj.value);