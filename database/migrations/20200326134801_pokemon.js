
exports.up = function(knex) {
    return knex.schema.createTable('pokemon', pokemon => {
  
      pokemon.increments();
  
      pokemon
        .string('pokemonName', 128 )
        .notNullable()
        .unique();
  
      pokemon.string('password', 128).notNullable();
  
      pokemon.string("type", 90);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pokemon');
  };