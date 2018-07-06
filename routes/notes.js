'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

//Add database connection
const knex = require('../knex');

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const  searchTerm  = req.query.searchTerm;
  const folderId = req.query.folderId;

  knex
    .select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .modify(function (queryBuilder) {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .modify(function (queryBuilder) {
      if (folderId) {
        queryBuilder.where('folder_id', folderId);
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
    // .select('id', 'title', 'content')
    .select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .where('notes.id', id)
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
  const updateableFields = ['title', 'content', 'folder_id'];

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

  const newItem = {
    title: req.body.title,
    content: req.body.content,
    folder_id: req.body.folderId
  };

  console.log('id: ', id);

  knex('notes')
    .update(newItem)
    .where('notes.id', id)
    .returning(['notes.id', 'title', 'content', 'folder_id as folderId'])
    .then(([results])=>{
      if(results){
        res.json(results);
      }else{
        next();
      }
    })
    .catch(err =>{
      next(err);
    });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content, folderId } = req.body;
  const newItem = { title, content, folder_id: folderId };

  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  let noteId;

   // Insert new note, instead of returning all the fields, just return the new `id`
   knex.insert(newItem)
    .into('notes')
    .returning('id')
    .then(([id]) => {
      noteId = id;
      // Using the new id, select the new note and the folder
      return knex.select('notes.id', 'title', 'content', 'folder_id as folder_id', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
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
