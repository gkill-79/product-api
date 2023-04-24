


const { Product } = require('../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../auth/auth.js');


module.exports = (app) => {
  app.get('/api/products', auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
        const limit = req.query.limit || 5;

        if(name.length < 3) {
            const message = `Le nom du produit doit contenir au moins 3 caractères.`
            return res.status(400).json({ message });
        }

      return Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        order: ['name'],
        limit: limit
      })
        .then(({ count, rows }) => {
          const message = `La liste a ${count} des produits a bien été trouvée.`;
          res.json({ message, data: rows });
        })
        .catch((error) => {
          const message = `La liste des produits n'a pas pu être trouvée. Réessaie dans un instant avant que ton Dealer ne fout le camps.`;
          res.status(500).json({ message, data: error });
        });
    } else {
      Product.findAll()
        .then((products) => {
          const message = 'La liste des produits a bien été trouvée.';
          res.json({ message, data: products });
        })
        .catch((error) => {
          const message = `La liste des produits n'a pas pu être trouvée. Réessaie dans un instant avant que ton Dealer ne fout le camps.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};




















