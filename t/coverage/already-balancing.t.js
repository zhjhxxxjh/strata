require('./proof')(2, prove)

function prove (async, assert) {
    var strata
    async(function () {
        serialize(__dirname + '/../basics/fixtures/split.before.json', tmp, async())
    }, function () {
        strata = createStrata({ directory: tmp, leafSize: 3, branchSize: 3 })
        strata.open(async())
    }, function () {
        strata.mutator('b', async())
    }, function (cursor) {
        cursor.insert('b', 'b', ~cursor.index)
        cursor.unlock(async())
    }, function () {
        strata.balance(async())
        async([function () {
            strata.balance(async())
        }, function (error) {
            assert(error.message, 'already balancing', 'error')
        }])
    }, function () {
        gather(strata, async())
    }, function (records) {
        assert(records, [ 'a', 'b', 'c', 'd' ], 'records')
    }, function() {
        strata.close(async())
    })
}
