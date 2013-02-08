# time-reduce

[![build status][1]][2] [![dependency status][3]][4]

[![browser support][5]][6]

A reducible representation of time, seeded by a server

## Example

```js
var Time = require("time-reduce")
var xhr = require("xhr-reduce")
var current = require("time-reduce/current")
var minutes = require("time-reduce/minutes")
var seconds = require("time-reduce/seconds")
var fold = require("reducers/folder")

// Seeded by local time
var time = Time(Date.now())

// Seeded by a server's time
var time = Time(xhr("/time"))

// current timestamp. This is not the local timestamp. This is
// in sync with the seeded time. so if local was 5 minutes behind
// when we passed the seeded time to the `Time` function then
// this timestamp will be 5 minutes ahead of whatever the local
// time is
var timestamp = current(time)

fold(time, function (timestamp) {
    // Called at 60 fps
})

fold(seconds(time), function (timestamp) {
    // Called once per second
})

fold(minutes(time), function (timestamp) {
    // Called once per minute
})


```

## Installation

`npm install time-reduce`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/time-reduce.png
  [2]: http://travis-ci.org/Colingo/time-reduce
  [3]: http://david-dm.org/Colingo/time-reduce/status.png
  [4]: http://david-dm.org/Colingo/time-reduce
  [5]: http://ci.testling.com/Colingo/time-reduce.png
  [6]: http://ci.testling.com/Colingo/time-reduce
