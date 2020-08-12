const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000;


//DB config
const db = require('./config/keys').mongoUrl;

//Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err))

//Routes
const items = require('./routes/api/items')//As i have used Router() for routing in routes.js .So to allow all routes from the project to index.js (index.js is entry so i need routes to be here in this page so to import routes.js I need to use middleware i.e use())
app.use('/', items)//1st parameter is prefix of url But dont want any pefix in url.So i kept it null.


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
