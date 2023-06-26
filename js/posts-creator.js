const DESCRIPTIONS = [
  "Какое-то описание.",
  "Ещё какое-то описание.",
  "Какое-то фото.",
  "Ещё какое-то фото.",
];
const NAMES = ["Вася", "Коля", "Игорь", "Марина", "Юля", "Надя"];
const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const POSTS_COUNTER = 25;
let idNumber = 1;
let idCommentNumber = 1;

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
  return elements
};

// Функция возвращает строку из 1 или 2 первых элементов массива

const createMessage = (elements) => shuffleArray(elements).slice(0, getRandomNumber(1, 2)).join(' ');


const createComment = () => {
  return {
    id: idCommentNumber++,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createMessage(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPost = () => {
  return {
    id: idNumber,
    url: `photos/${idNumber++}.jpg`,
    likes: getRandomNumber(30, 200),
    comments: createComments(),
    description: getRandomArrayElement(DESCRIPTIONS),
  };
};

const createComments = () => Array.from({ length: getRandomNumber(0, 30) }, createComment);

export const createPosts = () => Array.from({ length: POSTS_COUNTER }, createPost);

