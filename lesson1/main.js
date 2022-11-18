import colors from 'colors'

const n1 = Number(process.argv[2]);
const n2 = Number(process.argv[3]);

if (isNaN(n1) || isNaN(n2)) {
    console.log('The entered value is not a number')

} else {

    let color = 0;
    let count = 0;

    if (n1 < 2) {
        nextPrime:
            for (let i = 2; i <= n2; i++) { // Для всех i...
                for (let j = 2; j < i; j++) { // проверить, делится ли число..
                    if (i % j === 0) continue nextPrime; // не подходит, берём следующее
                }
                color < 3 ? color++ : color = 1 // Выбираем цвет для числа
                switch (color) {
                    case 1:
                        console.log(colors.green(i));
                        break
                    case 2:
                        console.log(colors.yellow(i));
                        break
                    case 3:
                        console.log(colors.red(i));

                }
                count++
            }
        if (count === 0) {
            console.log(colors.red('No prime numbers in given range'));
        }
    }
    else {
        nextPrime:
            for (let i = n1; i <= n2; i++) { // Для всех i...
                for (let j = 2; j < i; j++) { // проверить, делится ли число..
                    if (i % j === 0) continue nextPrime; // не подходит, берём следующее
                }
                color < 3 ? color++ : color = 1 // Выбираем цвет для числа
                switch (color) {
                    case 1:
                        console.log(colors.green(i));
                        break
                    case 2:
                        console.log(colors.yellow(i));
                        break
                    case 3:
                        console.log(colors.red(i));
                }
                count++
            }
        if (count === 0) {
            console.log(colors.red('No prime numbers in given range'));
        }
    }

}
