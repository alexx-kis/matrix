# requestAnimationFrame

## 1. что это такое

```js
requestAnimationFrame(callback);
```

- это API браузера, которое говорит: "выполни этот код перед следующей перерисовкой (repaint)"

### ключевая идея

- requestAnimationFrame синхронизирован с рендерингом браузера

## 2. почему это важно

- браузер обновляет экран примерно
  - 60 раз в секунду (60 FPS)
  - ~ каждые 16.6 ms

### проблема с setTimeout

```js
setTimeout(() => {}, 16);
```

- не синхронизирован с рендерингом
- может лагать
- может вызываться слишком часто или редко

### решение - requestAnimationFrame

```js
function animateFrame() {
  console.log('Frame update');
  requestAnimationFrame(animateFrame);
}

requestAnimationFrame(animateFrame);
```

### что происходит:

- браузер сам решает, когда вызвать callback
- всегда перед repaint
- идеально для анимаций

## 3. где используется:

### 1. анимации

```js
let positionX = 0;

function moveBox() {
  positionX += 5;

  console.log('Move to:', positionX);

  requestAnimationFrame(moveBox);
}

requestAnimationFrame(moveBox);
```

### 2. canvas/WebGL/Three.js

- плавные движения
- синхронизация с FPS

### 3. оптимизация UI

- обновление DOM без лагов
- плавный скролл

## 4. почему он лучше, чем setInterval

```
.	                      setInterval	        requestAnimationFrame

Частота	                фиксированная	      зависит от FPS
Синхронизация	          ❌ нет	              ✅ да
Производительность	    хуже	              лучше
Перерисовка	            может дёргаться	    плавная
```

## 5. важный плюс

- requestAnimationFrame останавливается, если вкладка не активна
- браузер:
  - экономит CPU
  - экономит батарею

- setInterval так не делает

## 6. как остановить requestAnimationFrame

```js
const frameId = requestAnimationFrame(() => {
  console.log('Frame');
});

cancelAnimationFrame(frameId);
```

## 7. связь с Event Loop

- requestAnimationFrame:
  - не microtask
  - не обычный macrotask
  - это отдельная очередь, связанная с рендерингом

```
Call Stack
-> Microtasks
-> requestAnimationFrame callbacks
-> Render (paint)
-> Macrotasks
```

## 8. второй аргумент - timestamp

```js
requestAnimationFrame((time) => {
  console.log(time);
});
```

- `time` - это время с момента загрузки страницы, используется для плавных анимаций

### пример правильной анимации

```js
let startTimeValue = null;

function animateSmooth(currentTime) {
  if (!startTimeValue) startTimeValue = currentTime;

  const progress = currentTime - startTimeValue;

  console.log(progress);

  if (progress < 1000) {
    requestAnimationFrame(animateSmooth);
  }
}

requestAnimationFrame(animateSmooth);
```

## 9. browser support

- `requestAnimationFrame` поддерживается:
  - chrome
  - firefox
  - safari
  - edge
- уже много лет

### раньше были префиксы

```js
window.webkitRequestAnimationFrame;
window.mozRequestAnimationFrame;
```

- сейчас они почти не нужны и только для очень старых браузеров

## 10. Fallback

```js
const requestAnim =
  window.requestAnimationFrame ||
  function (cb) {
    return setTimeout(cb, 16);
  };
```
