const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: {
      model: Product,
    }
  })
  res.status(200).json(tagData)
} catch (error) {
  console.log(error)
  res.status(500).json(error)
}

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    // be sure to include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
      }
    })
    res.status(200).json(tagData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
  
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = Tag.create(req.body)
    res.status(200).json(newTag)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
      name: req.body.name
    },
    {
      where: {
        id: req.params.id
      },
    })

    res.status(200).json(updatedTag)
  } catch (error) {

    req.status(500).json(error)
    console.log(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedTag)
  } catch (error) {
    console.log(error)
    res.status(200).json(error)
  }
});

module.exports = router;
