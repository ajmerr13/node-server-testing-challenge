const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  removeUser,
};

function find() {
  return db('pokemon').select('id', 'pokemonName', 'password');
}

function findBy(filter) {
  return db('pokemon').where(filter);
}

 function add(pokemon) {
return db('pokemon').insert(pokemon)
  .then(ids => {
    return ids[0]
  })

}

function findById(id) {
  return db('pokemon')
    .where({ id })
    .first();
}

function removeUser(id) {
  return db('pokemon')
    .where({id})
    .del();
} 