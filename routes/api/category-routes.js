const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const dbCategoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [
        {
          model: Product,
        }
      ]
    })

    const categories = dbCategoryData.map((category) =>

      category.get({ plain: true }))

      res.status(200).json(categories)

  } catch (error) {

    res.status(400).json(error)

    console.log(error)
  }


});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
try {

  const dbCategoryData = await Category.findByPk(req.params.id, {
    // be sure to include its associated Products
    include: [
      {
        model:Product,
      }
    ]
  })

  res.status(200).json(dbCategoryData)

} catch (error){

  console.log(error)
}
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {

    const newCategory = await Category.create(req.body)

    req.startus(200).json(newCategory)

  } catch (error) {

    res.status(400).json(error)

    console.log(error)
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,

    },
    {
      where: {
        id: req.params.id,
      }
    }
  ).then((updatedCategory) => {
    res.json(updatedCategory)
  }).catch((error) => res.json(error))
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id,
      }
    }).then((deletedCategory) => {
      res.json(deletedCategory)
    }).catch((error) => res.json(error))
});

module.exports = router;
