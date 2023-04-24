
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée', 'Psy', 'Combat', 'Glace', 'Roche', 'Sol', 'Spectre', 'Dragon', 'Acier', 'Ténèbres'];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { 
        msg: 'Le nom est dejas pris.'
      },
      validate: {
        notNull: { msg: 'Le nom doit être renseigné.' },
        notEmpty: { msg: 'Le nom doit être renseigné.' },
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Le HP doit être un nombre entier.' },
        min: { 
          args: [0], 
          msg: 'Le HP doit être supérieur ou égal à 0.'
        },
        notNull: { msg: 'Le HP doit être renseigné.' },
        max: {
          args: [999],
          msg: 'Le HP doit être inférieur à 1000.'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Le CP doit être un nombre entier.' },
        min: {
          args: [0],
          msg: 'Le CP doit être supérieur ou égal à 0.'
        },
        notNull: { msg: 'Le CP doit être renseigné.' },
        max: {
          args: [99],
          msg: 'Le CP doit être inférieur à 100.'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Le Picture doit être une URL valide.' },
        notNull: { msg: 'Le Picture doit être renseigné.' },
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if (!value) {
            throw new Error('Un produit ne peut pas avoir moins de 1 parfum.')
          }
          if (value.split(',').length > 3) {
            throw new Error('Un produit ne peut pas avoir plus de 3 parfums.')
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)) {
              throw new Error(`Le type ${type} doit appartenir à la liste suivante : ${validTypes.join(', ')}.`)
            }
          })
        },
      }
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}









