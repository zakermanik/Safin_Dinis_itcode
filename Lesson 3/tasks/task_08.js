/*
* Написать функцию, которая форматирует продолжительность, заданную в секундах, удобным для человека способом.

Функция должна принимать неотрицательное целое число.
*  Если оно равно нулю, оно просто возвращает «now».
*  В противном случае продолжительность выражается как комбинация years, days, hours, minutes и seconds.
*
Гораздо проще понять на примере:
* Для seconds = 62, ваша функция должна вернуть результат.
    "1 minute and 2 seconds"
* Для seconds = 3662 ваша функция должна вернуть результат.
    "1 hour, 1 minute and 2 seconds"
Для целей год состоит из 365 дней, а день — из 24 часов.

Обратите внимание, что пробелы важны.

Подробные правила
Результирующее выражение состоит из таких компонентов, как 4 seconds, 1 year и т.д.
*  Обычно это положительное целое число и одна из допустимых единиц времени, разделенные пробелом.
*  Единица времени используется во множественном числе, если целое число больше 1.
*

* Компоненты разделяются запятой и пробелом («,»).
*  За исключением последнего компонента, который разделяется символами «and», как если бы он был написан на английском языке.
Более значимые единицы времени наступят раньше, чем наименее значимые.
*  Следовательно, 1 second and 1 year неверно, но 1 year and 1 second верно.
*
Разные компоненты имеют разную единицу измерения времени. Таким образом, нет повторяющихся единиц, таких как 5 seconds и 1 second.

A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.
Компонент вообще не появится, если его значение равно нулю.
*  Следовательно, 1 minute and 0 seconds недопустимы, но они должны составлять всего 1 minute.
Единицу времени необходимо использовать «насколько это возможно».
*  Это означает, что функция должна возвращать не 61 seconds, а 1 minute and 1 second.
*  Формально длительность, указанная в компоненте, не должна превышать любую допустимую более значимую единицу времени.
*
* * */
function formattime(seconds) {
    
    let str = String;

    let year = Math.floor(seconds / (365 * 3600 * 24));;
    let day = Math.floor(seconds % (365 * 3600 * 24) / (3600 * 24));
    let hour = Math.floor(seconds % (3600 * 24) / 3600);
    let minute = Math.floor(seconds % 3600 / 60);
    let second = Math.floor(seconds % 60);

    function secondCount(second) {
        if (second == 1) {
            return " and " + second + " second"
        } else if (second != 0) {
            return " and " + second + " seconds"
        }
    }
    function minuteCount(second, minute) {
        if (second != 0) {
            if (minute == 1) {
                return ", " + minute + " minute"
            } else if (minute != 0) {
                return ", " + minute + " minutes"
            }
        } else {
            if (minute == 1) {
                return " and " + minute + " minute"
            } else if (minute != 0) {
                return " and " + minute + " minutes"
            }
        }
    }
    
    if (!seconds || seconds == 0) {
        return "now"
    }

    if (seconds < 60) {
        second = seconds;
        if (second == 1) {
            str = second + " second"
        } else {
            str = second + " seconds"
        }
        return str
    } else if (seconds < 3600) {
        if (minute == 1) {
            str = minute + " minute"
        } else {
            str = minute + " minutes"
        }

        if (second != 0) {
            str = str + secondCount(second)
        }
        return str
    } else if (seconds < 86400) {


        if (hour == 1) {
            str = hour + " hour";
        } else {
            str = hour + " hours";
        }

        if (minute != 0) {
            str = str + minuteCount(second, minute)
        }
        if (second != 0) {
            str = str + secondCount(second)
        }
        return str
    } else if (seconds < 31536000) {

        if (day == 1) {
            str = day + " day";
        } else {
            str = day + " days";
        }
        if (hour != 0) {
            if (hour == 1) {
                str = str + ", " + hour + " hour";
            } else {
                str = str + ", " + hour + " hours";
            }
            str = str + minuteCount(second, minute)
        } else {
            str = str + minuteCount(second, minute)
        }
        if (second != 0) {
            str = str + secondCount(second)
        }
        return str
    }
    // Оптимизированный и компактный способ с использованием массива объектов


    // if (seconds === 0) return "now";

    // const timeUnits = [
    //     { unit: "year", time: 365 * 24 * 60 * 60 },
    //     { unit: "day", time: 24 * 60 * 60 },
    //     { unit: "hour", time: 60 * 60 },
    //     { unit: "minute", time: 60 },
    //     { unit: "second", time: 1 }
    // ];

    // const parts = [];
    
    // for (const { unit, time } of timeUnits) {
    //     if (seconds >= time) {
    //         const count = Math.floor(seconds / time);
    //         seconds %= time;
    //         parts.push(`${count} ${unit}${count !== 1 ? 's' : ''}`);
    //     }
    // }
    
    // return parts.join(', ').replace(/,([^,]*)$/, ' and$1');
}



















































































































module.exports = formattime