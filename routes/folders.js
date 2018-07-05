'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

//Add database connection
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex()
    .select('id', 'name')
    .from('folders')
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

// Put update a folder
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex()
    .from('folders')
    .where({id})
    .update(updateObj)
    .returning(['id', 'name'])
    .then(results =>{
      res.json(results[0]);
    })
    .catch(err =>{
      next(err);
    });
});

// Post (insert) a folder
router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newFolder = { name };
  /***** Never trust users - validate input *****/
  if (!newFolder.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex()
    .from('folders')
    .insert(newFolder)
    .returning(['id','name'])
    .then(folder =>{
      res.location(`http://${req.headers.host}/folders/${folder[0].id}`).status(201).json(folder[0]);
    })
    .catch(err =>{
      next(err);
    });
});


// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex()
    .from('folders')
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
