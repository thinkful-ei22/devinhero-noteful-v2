'use strict';

const knex = require('../knex');

let searchTerm = 'Miracle';
// Get notes by searchterm
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

//Get notes by ID
// let noteId = 1003;
// knex()
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .where({id: noteId})
//   .then(results =>{
//     console.log(results[0]);
//   })
//   .catch(err =>{
//     console.log(err);
//   });

//Update note by id
// let noteId_2 = 1004;
// let updateObj = {title: 'EDIT THE SUN', content: 'DESCRIBE THE SUN'};
// knex()
//   .from('notes')
//   .where({id: noteId_2})
//   .update(updateObj)
//   .returning(['id', 'title', 'content'])
//   .then(results =>{
//     console.log(results[0]);
//   })
//   .catch(err =>{
//     console.log(err);
//   });

// Create new note
// let newObj = {title: 'INSERT THE SUN', content: 'The sun is a wondrous body, like a magnificent father!'};
// knex()
  // .from('notes')
  // .insert(newObj)
  // .returning(['id','title','content'])
  // .then(results =>{
  //   console.log(results[0]);
  // })
  // .catch(err =>{
  //   console.log(err);
  // });


// Delete note by ID
// let delId = 1009;
// knex()
//   .from('notes')
//   .where('id', delId)
//   .del()
//   .then(results =>{
//     console.log('Deleted: ', results);
//   })
//   .catch(err =>{
//     console.log(err);
//   });
