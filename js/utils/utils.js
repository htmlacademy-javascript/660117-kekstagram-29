// Функция создает случайное число в пределах от и до

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Функция возвращает случайный элемент из массива

const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

// Функция возвращает перемешанный массив

const shuffleArray = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }
  return elements;
};

const debounce = (callback, timeoutDelay) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { getRandomArrayElement, shuffleArray, getRandomNumber, debounce };
