'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

//Add database connection
const knex = require('../knex');

// Get all tags
router.get('/', (req, res, next) => {

  knex
    .select('id', 'name')
    .from('tags')
    .then(results =>{
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// Get by id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex()
    .select('id', 'name')
    .from('tags')
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

/* ========== POST/CREATE ITEM ========== */
router.post('/', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});


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
    .from('tags')
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


// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex()
    .from('tags')
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
