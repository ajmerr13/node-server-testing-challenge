exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {id: 1, 
          pokemonName: 'Gengar',
          password:'ShadowBall',
          type: "Ghost"
        },
        {id: 2, 
          pokemonName: 'Blastoise',
          password:'HydroCannon',
          type: "Water"
        },
        {id: 3, 
          pokemonName: 'Pikachu',
          password:'Thunderbolt',
          type: "Electric"
        }
      ]);
    });
}; 