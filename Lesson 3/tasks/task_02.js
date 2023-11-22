/*
*  Если мы получили палиндром, функция должна вернуть значение true. Если же нет — false.
* */

function isPalindrome(str) {
    if ( str == str.split('').reverse().join('')) {
        return true;
    } else { 
        return false; 
    }
}

















































module.exports = isPalindrome