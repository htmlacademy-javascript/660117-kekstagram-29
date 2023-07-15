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

export { getRandomArrayElement, shuffleArray, getRandomNumber };
