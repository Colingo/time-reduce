var test = require("tape")
var into = require("reducers/into")

var Time = require("../index")
var current = require("../current")
var mockTime = require("./lib/mockTime")

test("Time is a function", function (assert) {
    assert.equal(typeof Time, "function")
    assert.end()
})

test("Time returns a value", function (assert) {
    var time = Time()
    assert.ok(time)
    assert.end()
})

test.only("time when called returns a timestamp", function (assert) {
    var time = Time(0)
    var fold = require("reducers/fold")

    var list = []
    var initial = {}
    var it = function () {}

    for (var i = 0; i < 100; i++) {
        fold(time.current, it)
    }

    var t = Date.now()

    // into(current(time))

    for (var i = 0; i < 10; i++) {
        // fold(initial, it)
        // fold(current(time), it)
        // list.reduce(it, initial)
        fold(time.current, it)
        // Date.now()
    }

    var e = Date.now()

    console.log("time?", e - t)

    assert.end()
})

test("Time contains some timestamps", function (assert) {
    var mocks = mockTime()
    var time = mocks.time
    var advance = mocks.advance

    assert.deepEqual(into(current(time)), [0])

    advance(17)

    assert.deepEqual(into(current(time)), [17])

    advance(30)

    assert.deepEqual(into(current(time)), [47])

    assert.end()
})

test("time handles offset", function (assert) {
    var mocks = mockTime(10)
    var time = mocks.time
    var advance = mocks.advance

    assert.deepEqual(into(current(time)), [10])

    advance(10)

    assert.deepEqual(into(current(time)), [20])

    advance(22)

    assert.deepEqual(into(current(time)), [42])

    assert.end()
})

