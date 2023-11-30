const abs = require('../tasks/task_05')

describe('Среднее арифметическое', () => {
    const testCases = [
        { initValue: [1,2,3], result: 3 },
        { initValue: [ 2,5,8 ], result: 7.5 },
    ]
    testCases.forEach(testCase => {
        test(`Ожидается ${testCase.initValue} равно ${testCase.result}`, () => {
            const res = abs(testCase.initValue)
            expect(res).toBe(testCase.result)
        })
    })
})