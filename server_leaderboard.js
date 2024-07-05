const express = require('express');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connect() {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }
  
async function run() {
    try {
      await client.connect();
  
      const dbName = "User";
      const collectionName = "userdetails";
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
  
      try {
        const allLeaders = await collection.find({}).toArray();
        if (allLeaders.length === 0) {
          console.log("None Found\n");
        } else {
          return allLeaders;
        }
      } catch (err) {
        console.error(`Something went wrong trying to find documents: ${err}\n`);
      }      
    } catch (error) {
      console.error('Error during findOne:', error);
    } finally {
      client.close();
    }
  }
  

app.post("/leaderboard", async (req, res) => {
  const allLeaders = await run();
  res.render("leaderboard", { allLeaders: allLeaders });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connect();