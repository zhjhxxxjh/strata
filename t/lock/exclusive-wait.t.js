require('./proof')(1, prove)

function prove (async, assert) {
    var strata
    async(function () {
        serialize(__dirname + '/fixtures/tree.before.json', tmp, async())
    }, function () {
        strata = createStrata({ directory: tmp, leafSize: 3, branchSize: 3 })
        strata.open(async())
    }, function () {
        strata.iterator('h', async())
    }, function (cursor) {
        strata.mutator('h', async())
        cursor.unlock(async())
    }, function (cursor) {
        assert(cursor.page.items[cursor.offset].record, 'h', 'got')
        cursor.unlock(async())
    }, function() {
        strata.close(async())
    })
}
