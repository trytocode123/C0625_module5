const checkIsPrime = ((num) => {
    if (num <= 1) {
        return false;
    }
    if (num === 2) {
        return true;
    }
    if (num > 2) {
        for (let i = 2; i <= num; i++) {
            if (i < num && num % i === 0) {
                return false;
            }
        }
        return true;
    }
})

const numbers = [3, 12, 7, 19, 4, 8, 21, 1, 15, 2];

numbers.filter(number => checkIsPrime(number)).forEach(number => {
    console.log(number);
});


