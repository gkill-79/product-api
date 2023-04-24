




const { Sequelize, DataTypes } = require('sequelize')
const ProductModel = require('../models/product')
const UserModel = require('../models/user')
const products = require('./mock-product')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('the_rabbit_hold', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Product = ProductModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
      products.map(product => {
        Product.create({
          name: product.name,
          hp: product.hp,
          cp: product.cp,
          picture: product.picture,
          types: product.types
        }).then(product => console.log(product.toJSON()))
      })

        bcrypt.hash('admin', 10)
        .then(hash => User.create({ username: 'admin', password: hash }))
        .then(user => console.log(user.toJSON()))
    
        console.log('La base de donnée a bien été initialisée !')
    })
  }
  
  
module.exports = { 
  initDb, Product, User
}








