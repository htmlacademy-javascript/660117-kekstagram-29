// Функция создает случайное число в пределах от и до

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функция создает случайное, неповторяющееся число в пределах от и до

function createUniqueRandomNumber(min, max) {
  const values = [];
  return function () {
    while (!values.length <= max - min + 1) {
      let currentValue = getRandomNumber(min, max);
      if (values.length >= max - min + 1) {
        break;
      }
      while (values.includes(currentValue)) {
        currentValue = getRandomNumber(min, max);
      }
      values.push(currentValue);
      return currentValue;
    }
  };
}

const DESCRIPTIONS = ['Какое-то описание.','Ещё какое-то описание.','Какое-то фото.','Ещё какое-то фото.'];
const NAME = ['Вася', 'Коля', 'Игорь', 'Марина', 'Юля', 'Надя'];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const makeIdNumber = createUniqueRandomNumber(1, 25);
const makeUrlNumber = createUniqueRandomNumber(1, 25);
const makeCommentIdNumber = createUniqueRandomNumber(1, 1000);

// Функция создает массив со случайным количеством объектов с комментариями

function makeCommetsArrey() {
  const commentsArrey = [];
  for (let i = 0; i < getRandomNumber(0, 30); i++) {
    const object = {
      id: makeCommentIdNumber(),
      avatar: `avatar/${getRandomNumber(1, 6)}.svg`,
      message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
      name: NAME[getRandomNumber(0, NAME.length - 1)],
    };
    commentsArrey.push(object);
  }
  return commentsArrey;
}

// Функция создает массив из 25 объектов с описаниями

function createDescriptionsArrey() {
  const photoDescriptionArrey = [];
  for (let i = 0; i < 25; i++) {
    const object = {
      id: makeIdNumber(),
      url: `photos/${makeUrlNumber()}.jpg`,
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      likes: getRandomNumber(30, 200),
      comments: makeCommetsArrey(),
    };
    photoDescriptionArrey.push(object);
  }
  return photoDescriptionArrey;
}

console.log(createDescriptionsArrey());
