



const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('./src/db/sequelize');


const app = express();
const port = 3060;

app.use(morgan('dev'));
app.use(bodyParser.json());


Sequelize.initDb();

// Ici, on va placer nos futur terminaisons de routes. 

require('./src/routes/findAllProducts')(app);
require('./src/routes/findProductByPk')(app);
require('./src/routes/createProduct')(app);
require('./src/routes/updateProduct')(app);
require('./src/routes/deleteProduct')(app);
require('./src/routes/login')(app);

// On ajoute un middleware pour gérer les erreurs 404

app.use(({res, req}) => {
    const message = `La ressource demandée ${req.url} n'existe pas.`;
    res.status(404).json({ message });
});


app.listen(port, () => console.log(`hello la grosse Bertha, notre appli est lancée sur : http://localhost:${port}`));



























