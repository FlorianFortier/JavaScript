for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i])
    for (let j = 0; j < numbers[i].length; j++) {
        if (numbers[i][j] % 2 === 0) {
            numbers[i][j] = "Blade"
        } else {
            numbers[i][j] = "Runner"
        }
    }
}

for (let i in numbers) {
    console.log(numbers[i])
    for (let j in numbers[i]) {
        if (numbers[i][j] % 2 === 0) {
            numbers[i][j] = "Blade"
        } else {
            numbers[i][j] = "Runner"
        }
    }
}


console.log(numbers.map(i => i.map(j => j % 2 === 0 ? "Blade" : "Runner")))