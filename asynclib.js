const async = require(`async`)

async.parallel([
    function (callback) {
        setTimeout(function () {
            callback(null, 'Manchester United');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            callback(null, 'Ole Gunnar Solsjakaer');
        }, 100);
    }
],
    function (err, results) {
        console.log(results)
    });

async.series({
    name: function (callback) {
        setTimeout(function () {
            console.log(`.........................................................................`)
            callback(null, "Manchester City");
        }, 200);
    },
    manager: function (callback) {
        setTimeout(function () {
            callback(null, "Pep Guardiola");
        }, 100);
    }
}, function (err, results) {
    console.log(results)
});

async.waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    setTimeout(function () {
        console.log(`..........................................................................`)
        console.log(result)
    }, 4000)
});
function myFirstFunction(callback) {
    callback(null, 'one', 'two');
}
function mySecondFunction(arg1, arg2, callback) {                                               // The value arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
}
function myLastFunction(arg1, callback) {                                                       // The value of arg1 is now three
    callback(null, 'completed');
}