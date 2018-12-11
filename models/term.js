var db = require('../db/config');
var term = {};

term.getAll = function(req , res , next){
    db.manyOrNone("SELECT * FROM terms;")
    .then(function (result){
        res.locals.term = result
        next();
    })
}

term.find = function(req , res , next){
    var id = req.prams.id;
    db.manyOrNone("SELECT * FROM terms WHERE id = $1;",[id])
    .then(function(error){
        console.log(error);
        next();
    })
}

term.creat = function(req , res, next){
    var termData = {
        name: req.body.name
    }
    console.log(req.body)
    db.one(
        `INSERT INTO terms (name ,definition) VALUES ($1 , $2) RETURNING id;`,
        [termData.name , termData.definition])
        .then(function (result){
            console.log(result)
            res.locals.term_id = result.id;
            next();
        })
        .catch(function (error){
            console.log(error)
            next();
        })
}

term.update = function(req , res , next){
    var termData = {
        name: req.body.name
    }
    db.one(`UPDATE term SET name = $1 , definition =$2 `)
}

term.delete = function(req , res , next){
    db.none('DELETE FROM term WHERE id=$1;', [req.prams.id])
    .then(function(){
        console.log('Deleted!!!!!!!');
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

module.exports = term;