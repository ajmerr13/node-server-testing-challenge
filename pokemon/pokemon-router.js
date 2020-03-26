const router = require('express').Router();

const Pokemon = require('./pokemon-model.js');

const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
  Pokemon.find()
    .then(pokemon => {
      res.json(pokemon);
    })
    .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Pokemon.findById(id)
  .then(pokemon => {
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ message: 'Could not find pokemon with that id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to catch that Pokemon' });
  });
});

router.delete('/:id', (req, res) => {
  const { id}= req.params;

  Pokemon.removeUser(id)
    .then(deleted => {
      if(deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find pokemon with given id' });      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to release that Pokemon' });
    });
})


module.exports = router;