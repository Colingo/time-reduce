var mock = require("mock")
var TimeMock = require("time-mock")

module.exports = mockTime

function mockTime(server) {
    var mockTime = TimeMock(0)
    var Time = mock("../../index", {
        timers: mockTime
        , "date-now": mockTime.now
    }, require)

    var time = Time(server || mockTime.now())

    return { time: time, advance: mockTime.advance }
}
