



const { Product } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/products/:id', (req, res) => {
    Product.findByPk(req.params.id)
      .then(product => {
        if(product === null) {
            const message = `Le produit avec l'identifiant n°${req.params.id} n'a pas été toper. Réessaie avec un autre identifiant avant que ton Dealer ne fout le camps.`;
            return res.status(404).json({ message })
        }
        const message = "Tu as trouvé t'a Dose espèce de Joyncke."
        res.json({ message, data: product })
      })
      .catch(error => {
        const message = `La liste des produits n'a pas pu être toper. Réessaie dans un instant avant que ton Dealer ne fout le camps.`
        res.status(500).json({ message, data: error })
      })
  })
}



















