




const { Product } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/products/:id', (req, res) => {
    Product.findByPk(req.params.id).then(product => {
      const productDeleted = product;
      return Product.destroy({
        where: { id: product.id }
      })
      .then(_ => {
        const message = `Le product avec l'identifiant n°${productDeleted.id} a bien été supprimé.`
        res.json({message, data: productDeleted })
      })
      .catch(error => {
        const message = `La liste des produits n'a pas pu être toper. Réessaie dans un instant avant que ton Dealer ne fout le camps.`
        res.status(500).json({ message, data: error })
      })
    })
  })
}


















