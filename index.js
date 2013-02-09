var hub = require("reducers/hub")
var map = require("reducers/map")
var expand = require("reducers/expand")
var buffer = require("buffer-reduce")

var reducible = require("reducible")
var invoker = require("invoker")

var now = require("date-now")
var setTimeout = require("timers").setTimeout
var clearTimeout = require("timers").clearTimeout

var SECOND = 1000

module.exports = Time

// function Time(seed) {
//     var current = now()

//     return function () {
//         return seed + (now() - current)
//     }
// }

function Time(serverSeed) {
    // var originalTime = buffer(map(serverSeed, function (seed) {
    //     return { seed: seed, current: now() }
    // }))

    // var current = map(originalTime, function (time) {
    //     return currentTime(time)
    // })
    var current = now()

    return {
        current: serverSeed + (now() - current)
    }
}

function stream(originalTime) {
    return hub(expand(originalTime, function (time) {
        return reducible(function (next, initial) {
            var invoke = invoker(next, initial, cleanup)
            var token = setTimeout(loop, SECOND)

            function loop() {
                token = setTimeout(loop, SECOND)

                invoke(currentTime(time))
            }

            function cleanup() {
                clearTimeout(token)
            }
        })
    }))
}

function currentTime(time) {
    var rightNow = now()
    var diff = rightNow - time.current
    return time.seed + diff
}
