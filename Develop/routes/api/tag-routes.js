const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagPro = await Tag.findAll({
      include: [{ model: Product}],
    })
      res.json(tagPro);
    }
    catch(err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const oneCat = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
      res.json(oneCat);
    }
    catch(err) {
      res.status(500).json(err);
    }
    });

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  
  })
  .then((newTag) => {
      
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update (req.body,
    {
      where: {
        id: req.params.id
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated category as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
