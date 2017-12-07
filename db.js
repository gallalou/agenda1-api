var mongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
}


exports.connect= function (url, callback) {

    if (state.db)
        return callback(null, state.db);

    mongoClient.connect(url, function (err, database) {

        if (err)
            return callback(err, null);

        state.db = database;
        return callback(err, state.db);
    });
}


exports.get= function () {
    return state.db;
}

exports.close= function (callback) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            return callback(err);
        });
    }
}
