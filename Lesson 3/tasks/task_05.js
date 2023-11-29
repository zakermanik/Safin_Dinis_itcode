/*
* Написать функцию, которая принимает массив чисел, например [1,2,3,4,5] и функция возращает среднее арифметическое, (округлить результат до десятых)
* */

function abs(array) {
    let result = array.reduce((sum, num) => sum + num, 0);
    return result/2;
}









































module.exports = abs