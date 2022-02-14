const calcExpense = (item) => {
    let total = 0;
    item.forEach(data => {
        total += data.expenseAmount
    });
    return total
}

const calcIncome = (item) => {
    let total = 0;
    item.forEach(data => {
        total += data.incomeAmount
    });
    return total
}

module.exports = { calcExpense, calcIncome }