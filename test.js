Object.defineProperty(obj, 'permanent', {
  value: 'forever',
  configurable: false,
});
delete obj.permanent; // не сработает