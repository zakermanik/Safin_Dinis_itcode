/*Ваша задача — написать такую кодировку.
  Для данной строки верните массив массивов [[i1, s1], [i2, s2], …, [in, sn]],
так что можно восстановить исходную строку, реплицируя символ sx ix раз и объединяя. Ваша кодировка длины серии должна быть минимальной, т.е.
. для всех i значения si и si+1 должны различаться.*/
// runLengthEncoding("hello world!")
//=>      [[1,'h'], [1,'e'], [2,'l'], [1,'o'], [1,' '], [1,'w'], [1,'o'], [1,'r'], [1,'l'], [1,'d'], [1,'!']]
// runLengthEncoding("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbb")
//  // => [[34,'a'], [3,'b']]
function runLengthEncoding(str) {
  let array = [];
  k = 1;

  if (!str) {
    return array
  }

  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      k++;
    } else {
      array.push([k, str[i - 1]]);
      k = 1;
    }
  }

  array.push([k, str[str.length - 1]]);
  return array;
}













































































module.exports = runLengthEncoding