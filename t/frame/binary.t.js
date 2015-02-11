#!/usr/bin/env node

require('proof')(4, prove)

function prove (assert) {
    var json = require('../../json')
    var Queue = require('../../queue')
    var Framer = require('../../frame/binary')
    var framer = new Framer('sha1')
    var queue = new Queue
    var length = framer.serialize(json.serializer, queue, [ 1, 2, 3 ], { a: 1 })
    assert(length, 51, 'bodied length')
    queue.finish()
    var entry = framer.deserialize(json.deserialize, queue.buffers.shift(), 0)
    assert(entry, { length: 51, heft: 7, header: [ 1, 2, 3 ], body: { a: 1 } }, 'bodied')
    var queue = new Queue
    var length = framer.serialize(json.serializer, queue, [ 1, 2, 3 ])
    assert(length, 44, 'unbodied length')
    queue.finish()
    var entry = framer.deserialize(json.deserialize, queue.buffers.shift(), 0)
    assert(entry, { length: 44, heft: null, header: [ 1, 2, 3 ], body: null }, 'bodied')
}
