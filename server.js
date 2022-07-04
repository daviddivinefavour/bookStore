require('dotenv').config();
require('./config/mongoDB.config');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const route = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

route(app);

app.listen(port, () => console.log(`Server started on port ${port}`));