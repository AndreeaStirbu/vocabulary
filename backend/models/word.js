var db = require('../models/db');

var TYPES = require("tedious").TYPES; 

var config = { 
    server: 'localhost',
    authentication: {
        type: "default",
        options: {  
          userName: "sa",
          password: "root"
        }
    },
    options: {
        database: 'vocabulary', // update
        encrypt: false
    }
}; 
 
module.exports = {
    getAllWords: function (callback) { 
        var con = new db.msSqlConnecter(config); 
        con.connect().then(function () { 
            new con.Request("select * from word") 
                .onComplete(function (count, datas) { 
                    if (callback) 
                        callback(datas); 
                }) 
                .onError(function (err) { 
                    console.log(err); 
                }).Run(); 
        }).catch(function (ex) { 
            console.log(ex); 
        }); 
    },
    getWord: function (id, callback) { 
        var con = new db.msSqlConnecter(config); 
        con.connect().then(function () { 
            new con.Request("select * from word where wordid = @id") 
            .addParam("id", TYPES.NVarChar, id)
                .onComplete(function (count, datas) { 
                    if (callback) 
                        callback(datas); 
                }) 
                .onError(function (err) { 
                    console.log(err); 
                }).Run(); 
        }).catch(function (ex) { 
            console.log(ex); 
        }); 
    },
    addWord: function (id, word, def, example, callback) { 
        var con = new db.msSqlConnecter(config); 
        con.connect().then(function () { 
            new con.Request("insert into word values(@word,@def,@example)") 
            .addParam("id", TYPES.NVarChar, id) 
            .addParam("word", TYPES.NVarChar, word) 
            .addParam("def", TYPES.NVarChar, def) 
            .addParam("example", TYPES.NVarChar, example) 
            .onComplete(function (count) { 
                if (callback) 
                    callback(count); 
            }) 
            .onError(function (err) { 
                console.log(err); 
            }) 
            .Run(); 
        }).catch(function (ex) { 
            console.log(ex); 
        }); 
    },
    deleteWord: function(id, callback) {
        var con = new db.msSqlConnecter(config);
        con.connect().then(function() {
            new con.Request("delete from word where wordid = @id")
            .addParam("id", TYPES.NVarChar, id)
            .onComplete(function (count) { 
                if (callback) 
                    callback(count); 
            }) 
            .onError(function (err) { 
                console.log(err); 
            }) 
            .Run(); 
        }).catch(function (ex) { 
            console.log(ex); 
        })
    },
    updateWord: function(id, word, def, example, callback) {
        var con = new db.msSqlConnecter(config);
        con.connect().then(function() {
            new con.Request("update word set word = coalesce(@word, word), meaning = coalesce(@def,Meaning), example = coalesce(@example, example) where wordid = @id")
            .addParam("id", TYPES.NVarChar, id) 
            .addParam("word", TYPES.NVarChar, word) 
            .addParam("def", TYPES.NVarChar, def) 
            .addParam("example", TYPES.NVarChar, example) 
            .onComplete(function (count) { 
                if (callback) 
                    callback(count); 
            }) 
            .onError(function (err) { 
                console.log(err); 
            }) 
            .Run(); 
        }).catch(function (ex) { 
            console.log(ex); 
        })
    }
}
