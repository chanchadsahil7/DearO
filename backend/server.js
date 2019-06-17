const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const { getScrapedData } = require('./scrape.js')
const cors = require('cors');

app.use(cors());
/**
 * API to scrape the data from the given link
 * and store it in the mongo db
 */
app.get('/scrape', (req, res) => {
  // not a good practice to open a connection for each request.
  // TODO: Open the connection with db once the server kicks in.
  mongo.connect(url, async (err, client) => {
    if (err) {
      console.error(err)
      res.send({msg: "Cannot connect to db"});
    }
    // fetching the data from the output of the scrape script.
    data = await getScrapedData();
    console.log("in server", data);

    // Note: assumption the db and the collection exist.
    // connectiong to  `repo` db and collection `repoList`.
    const db = client.db('repo');
    const collection = db.collection('repoList');

    // inserting a list of results together.
    collection.insertMany(data, (err, result) => {
      if (err) {
        console.error(err);
        res.send({msg: "error in inserting the data", status: 304});
      }
      res.send({msg: "Data Scraped and Stored in Mongo DB", status: 201});
    })
    client.close();
  });
})

/**API to search data according to the feild in the db.
* eg: localhost:8081/search?title=something&desc=something
 */
app.get('/search', (req, res) => {
  const title = req.query.title;
  const desc = req.query.desc;
  const language = req.query.language;

  // not a good practice to open a connection for each request.
  // TODO: Open the connection with db once the server kicks in.
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      res.send({msg: "Cannot connect to db"});
    }
    const db = client.db('repo');
    const collection = db.collection('repoList');

    // form a search query for the searching the data.
    const query = {
      $or:[
        {
          title:{$regex: `${title}`, $options: 'i'}
        },
        {
          desc:{$regex: `${desc}`, $options: 'i'}
        },
        {
          language:{$regex: `${language}`, $options: 'i'}
        }
      ]
    }

    // query the database and return the data.
    collection.find(query).toArray((err, data) => {
      if (err) {
        console.error(err);
        res.send({msg: "error in querying the data"});
      }
      console.log(data);
      res.send(data);
    });
  });
})

app.get('/getData', (req, res) => {
  // not a good practice to open a connection for each request.
  // TODO: Open the connection with db once the server kicks in.
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      res.send({msg: "Cannot connect to db"});
    }
    const db = client.db('repo');
    const collection = db.collection('repoList');

    // query the database and return the data.
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error(err);
        res.send({msg: "error in querying the data"});
      }
      console.log(data);
      res.send(data);
    });
  });
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
