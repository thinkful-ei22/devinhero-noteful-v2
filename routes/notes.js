'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

//Add database connection
const knex = require('../knex');

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const  searchTerm  = req.query.searchTerm;

  knex
    .select('id', 'title', 'content')
    .from('notes')
    .modify(queryBuilder => {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .orderBy('notes.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex()
    .select('id', 'title', 'content')
    .from('notes')
    .where({id})
    .then(results =>{
      if(results[0]){
        res.json(results[0]);
      }else{
        next();
      }
    })
    .catch(err =>{
      next(err);
    });
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex()
    .from('notes')
    .where({id})
    .update(updateObj)
    .returning(['id', 'title', 'content'])
    .then(results =>{
      res.json(results[0]);
    })
    .catch(err =>{
      next(err);
    });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex()
    .from('notes')
    .insert(newItem)
    .returning(['id','title','content'])
    .then(item =>{
      res.location(`http://${req.headers.host}/notes/${item[0].id}`).status(201).json(item[0]);
    })
    .catch(err =>{
      next(err);
    });
});

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex()
    .from('notes')
    .where({id})
    .del()
    .then(results =>{
      if(results){
        res.sendStatus(204);
      }else{
        next();
      }
    })
    .catch(err =>{
      next(err);
    });
});

module.exports = router;
