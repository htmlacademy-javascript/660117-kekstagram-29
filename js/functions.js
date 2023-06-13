const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return string.split('').reverse().join('') === string;
};

const extractNumbers = (string) => parseInt(String(string).replace(/\D/g, ''));
