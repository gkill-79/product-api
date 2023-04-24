




const { Product } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.post('/api/products', auth, (req, res) => {
    Product.create(req.body)
      .then(product => {
        const message = `Le product ${req.body.name} a bien été crée.`
        res.json({ message, data: product })
      })
        .catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            if(error instanceof UniqueConstraintError) {
                return res.statut(400).json({ message: error.message, data: error })
            }
            const message = `Le product n'a pas pu être crée. Réessaie dans un instant avant que ton Dealer ne fout le camps.`
            res.status(500).json({ message, data: error })
            })
  })
}




















