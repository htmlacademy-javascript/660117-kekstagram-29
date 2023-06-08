const count = (string, maxLength) => {
  return string.length <= maxLength;
}

const isPalindrom = (string) => {
  const normalizedString = string.toLowerCase();
  let newString = '';
  for (let i=normalizedString.length-1; i>=0 ; i--) {
    newString +=normalizedString.at(i)
  }
  return newString === string;
}

const takeNumbers = (string) => {
  let number = '';
  if (string >= 0 || string < 0) {
    string = string.toString()
  }
  for (let i=0; i<string.length; i++) {
    if (string[i] >= 0 && string[i] <= 9) {
      number += string[i]
    } else {
      continue
    }
  }
  return parseInt(number)
}

console.log(takeNumbers(1.5))
