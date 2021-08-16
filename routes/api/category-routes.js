const router = require('express').Router();
const { Category, Product } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
  attributes: ["id", "category_name"], 
  include:[
    {
      model:Product, 
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }
  ]
})
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.get('/:id',  (req, res) => {
  // find one category by its `id` value
  Category.findOne({ where: {id: req.params.id}, attributes: ["id", "category_name"], include:[{model: Product, attributes: ["id","product_name", "price", "stock", "category_id"]}]})
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name}) 
  .then(dbCategoryData => {
    res.json(dbCategoryData)
  }) 
  .catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name},
    {
      where: {id: req.params.id}
    }) 
  .then(dbCategoryData => {
    res.json(dbCategoryData)
  }) 
  .catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where: {id: req.params.id}
    }) 
  .then(dbCategoryData => {
    res.json(dbCategoryData)
  }) 
  .catch(err => {
    res.status(500).json(err)
  })
  // delete a category by its `id` value
});

module.exports = router;
