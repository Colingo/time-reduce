var test = require("tape")
var into = require("reducers/into")

var mockTime = require("./lib/mockTime")
var seconds = require("../seconds")
var Time = require("../index")

test("can stream seconds", function (assert) {
    var mocks = mockTime()
    var time = mocks.time
    var advance = mocks.advance

    var list = []
    into(seconds(time), list)

    advance(999)

    assert.deepEqual(list, [])

    advance(1)

    assert.deepEqual(list, [1000])

    advance(1)

    assert.deepEqual(list, [1000])

    advance(1999)

    assert.deepEqual(list, [1000, 2000, 3000])

    advance(999)

    assert.deepEqual(list, [1000, 2000, 3000])

    advance(10001)

    assert.deepEqual(list, [1000, 2000, 3000, 4000, 5000, 6000
        , 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000])

    assert.end()
})

test("streams seconds correctly", function (assert) {
    var mocks = mockTime(560)
    var time = mocks.time
    var advance = mocks.advance

    var list = []
    into(seconds(time), list)

    advance(1000)

    assert.deepEqual(list, [1560])

    advance(2000)

    assert.deepEqual(list, [1560, 2560, 3560])

    assert.end()
})
