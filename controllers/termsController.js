var express = require('express');
var router = express.Router();

var term = require('../models/term');

router.get('/', term.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit' ,term.find , renderEdit)
router.get('/:id', term.find, renderShow);

router.post('/', term.create, redirectShow);
router.delete('/:id', term.delete, redirectIndex)
router.put('/:id' , term.update, redirectShow)

function renderIndex(req, res){
  mustacheVariables = {
    term: res.locals.term
  }
  res.render('./term/index', mustacheVariables);
}

function renderShow(req,res){
  mustacheVariables = res.locals.term;
  res.render('./term/show', mustacheVariables);
}

function renderEdit(req ,res){
  var mustacheVariables =  res.locals.term;
  res.render('./term/edit' , mustacheVariables);
}

function renderNew(req, res){
  res.render('./term/new');
}

function redirectShow(req, res) {
  console.log(req.body);
  res.redirect(`/term/${res.locals.term}`);
}

function redirectIndex(req, res){
  res.redirect('/term');
}

module.exports = router;