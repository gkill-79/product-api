



const { Product } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

  
module.exports = (app) => {
  app.put('/api/products/:id', (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Product.findByPk(id).then(product => {
        if(product === null) {
            const message = `Le produit avec l'identifiant n°${req.params.id} n'a pas été toper. Réessaie avec un autre identifiant avant que ton Dealer ne fout le camps.`;
            return res.status(404).json({ message })
        }
        const message = `Le produit ${product.name} a bien été modifié.`
        res.json({message, data: product })
      })
    })
    .catch(error => {
        if(error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
            return res.statut(400).json({ message: error.message, data: error })
        }
        const message = `Le produit n'a pas pu être modifié. Réessaie dans un instant avant que ton Dealer ne fout le camps.`
        res.status(500).json({ message, data: error })
  })
})

}





















