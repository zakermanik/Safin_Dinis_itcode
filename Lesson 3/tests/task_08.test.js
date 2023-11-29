const formatDuration = require('../tasks/task_08')

describe('формат времени', () => {
    const testCases = [
        { initValue: 1 , result: "1 second" },
        { initValue: 62 , result: "1 minute and 2 seconds" },
        { initValue: 120 , result:"2 minutes" },
        { initValue: 3600 , result: "1 hour" },
        { initValue: 3662, result: "1 hour, 1 minute and 2 seconds" },
    ]
    testCases.forEach(testCase => {
        test(`Ожидается ${JSON.stringify(testCase.initValue)} равно ${JSON.stringify(testCase.result)}`, () => {
            const res = formatDuration(testCase.initValue)
            expect(res).toEqual(testCase.result)
        })
    })
})