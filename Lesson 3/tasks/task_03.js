/*
* Нужно написать функцию, принимающую строку в качестве аргумента и возвращающую количество гласных, которые содержатся в строке.
Гласными являются «a», «e», «i», «o», «u», «y».
* */

function getVowelsCount(str) {
    let vowels = ["a", "e", "i", "u", "y"];
    let arr = str.split('');
    let k = 0;
    
    arr.forEach(b => {
        if (vowels.includes(b)) {
            k += 1
        }
    });
    return k;
}












































module.exports = getVowelsCount