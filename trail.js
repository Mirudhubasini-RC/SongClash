const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const app = express();

const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connencted to MongoDB");
        
    } catch(error) {
        console.error(error);
    }
}

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

connect();

function run(username1, email1, password1) {
  const dbName = "User";
  const collectionName = "userdetails";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  /*database.collection("userdetails").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    database.close();
  });*/

  const userdetails = [
    {
      username: username1,
      email: email1,
      password: password1
    },
  ];

  try {
    const insertManyResult = collection.insertMany(userdetails);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }

  client.close();
}

app.get("/", async (req, res) => {
  try {  
    res.render("login.ejs", {
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/', (req, res) => {
  if(req.body.submit == 'submit'){
    const username = req.body.username; 
    const email = req.body.email;
    const password = req.body.pswd;
    run(username,email, password);
  }

  else if(req.body.submit == 'login'){
    console.log("Login Successful.");
  }

  try {  
    res.render("hi.ejs", {
    });
  } catch (err) {
    console.log(err);
  }

});
