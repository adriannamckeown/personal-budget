// Budget API

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const budgetModel = require("./models/budget_schema")

// mongoose connection 
const url = 'mongodb://localhost:27017/budgetdb';

mongoose.connect(url)
        .then(() => {
            console.log("Connected to the database")
            mongoose.connection.close()
        })
        .catch((connectionError) =>  {
            console.log(connectionError)
        })

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


app.post('/add', (req, res) => {
    console.log(req.body);
    let newData = new budgetModel({
        title: req.body.title,
        budget: req.body.budget,
        color: req.body.color
    });
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Connected to the database")
            budgetModel.insertMany(newData)
                .then((data) => {
                    console.log("Inserted Successfully", data);
                    mongoose.connection.close();
                    res.statusCode = 202;
                    res.end("data successfully added");
                })
                .catch(err => {
                    console.log("Unable to insert data into your collection", err);
                });
        });
})


app.get('/', (req, res) => {
    mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database")
        budgetModel.find({})
            .then((data) => {
            console.log('found budget data for index');
            });
            mongoose.connection.close();
    })
    .catch(err => {
          console.log('error finding employees', err);
    });
});

app.get('/budget', (req, res) => {
    mongoose.connect(url)
    .then(() => {
        console.log("Connected to the database")
        budgetModel.find({})
            .then((data) => {
                console.log(data);
                res.send(data);
                mongoose.connection.close();
            })
            .catch(connectionError => {
            console.log("Error retrieving budget data", connectionError);
            })
    .catch((connectionError) =>{
        console.log("Error connecting to mongodb", connectionError)
    });
  });
})

