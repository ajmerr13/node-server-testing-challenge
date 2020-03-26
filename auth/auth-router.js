const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require('../config/secrets.js')
const Pokemon = require('../pokemon/pokemon-model.js');

router.post('/register', (req, res) => {
  let pokemon = req.body;
  const hash = bcrypt.hashSync(pokemon.password, 10); 
  pokemon.password = hash;

  Pokemon.add(pokemon)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { pokemonName, password } = req.body;

  Pokemon.findBy({ pokemonName })
    .first()
    .then(pokemon => {
      if (pokemon && bcrypt.compareSync(password, pokemon.password)) {

        const token = signToken(pokemon);

        res.status(200).json({ token }); 
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(pokemon) {
  const payload = {
    pokemon
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;