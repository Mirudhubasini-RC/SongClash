const express = require('express');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const axios = require('axios');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { log } = require('console');
const io = new Server(server);

const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var findOneResult;
var userJSON = 0;
var quick = null;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

async function find(username1, email1, password1) {
  const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const dbName = "User";
    const collectionName = "userdetails";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const findOneQuery = { _id: email1 };

    try {
      findOneResult = await collection.findOne(findOneQuery);
      if (findOneResult === null) {
        console.log("Sign up.\n");
        insert(username1, email1, password1);
        return null;
      } else {
        console.log(`Found an account:\n${JSON.stringify(findOneResult)}\n`);
        return findOneResult;
      }
    } catch (err) {
      console.error(`Something went wrong trying to find one document: ${err}\n`);
    }
  } catch (error) {
    console.error('Error during findOne:', error);
  } finally {
    client.close();
  }
}

async function findLogin(email1, password1) {
  const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const dbName = "User";
    const collectionName = "userdetails";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const findOneQuery = { _id: email1 };

    try {
      findOneResult = await collection.findOne(findOneQuery);
      if (findOneResult === null) {
        console.log("Oops, it seems like you don't have an account. Try signing in.\n");
      } else {
          if(findOneResult["password"] == password1){
            console.log("login successful");
            userJSON = findOneResult;
          }
          else{
            return null;
          }
      }
      return findOneResult;
    } catch (err) {
      console.error(`Something went wrong trying to find one document: ${err}\n`);
      return null;
    }
  } catch (error) {
    console.error('Error during findOne:', error);
  } finally {
    client.close();
  }

  return null;
}

async function insert(username1, email1, password1) {
    await client.connect();

    const dbName = "User";
    const collectionName = "userdetails";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

  const userdetails = [
    {
      username: username1,
      _id: email1,
      password: password1,
      points: 0.0,
      streaks: 0,
    },
  ];

  userJSON = userdetails;
  try {
    collection.insertMany(userdetails);
    console.log(`Documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
}

async function insertAvatar(avatar, email1) {
  const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/User?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const dbName = "User";
    const collectionName = "userdetails";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {        
      const filter = { _id: email1 }; // Replace with the correct field
      const update = { $set: { avatarURL: avatar } };
    
      await collection.updateOne(filter, update);

      findOneResult = await collection.findOne(filter);
      userJSON = findOneResult;
      
    } catch (error) {
      console.error('Error during update:', error);
    }
  } catch (err) {
    console.error('Error during connection:', err);
  } finally {
    client.close();
    return 1;
  }
}

async function updatePoints(p) {
  const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/User?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const dbName = "User";
    const collectionName = "userdetails";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {        
      const filter = { _id: userJSON['_id'] }; // Replace with the correct field
      const update = { $set: { points: p } };
    
      await collection.updateOne(filter, update);

      findOneResult = await collection.findOne(filter);
      userJSON = findOneResult;
      
    } catch (error) {
      console.error('Error during update:', error);
    }
  } catch (err) {
    console.error('Error during connection:', err);
  } finally {
    client.close();
  }
}

async function updateProfile(uname, pswd) {
  const uri = "mongodb+srv://23mx127:23mx@mycluster.aiqya5g.mongodb.net/User?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const dbName = "User";
    const collectionName = "userdetails";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {        
      const filter = { _id: userJSON['_id'] }; // Replace with the correct field
      const update = { $set: { username: uname, password: pswd } };
    
      await collection.updateOne(filter, update);

      findOneResult = await collection.findOne(filter);
      userJSON = findOneResult;
      console.error('Updated Successfully:', userJSON);
      
    } catch (error) {
      console.error('Error during update:', error);
    }
  } catch (err) {
    console.error('Error during connection:', err);
  } finally {
    client.close();
  }
}

connect();

app.get("/", async (req, res) => {
  try {
    res.render("landing");
  } catch (err) {
    console.log(err);
  }
});

app.post('/enter', async (req, res) => {
  try {
    if (req.body.submit == 'quickplay') {
      quick =  {
          username: 'player',
          points: 0.0,
          streaks: 0,
          avatarURL: ''
      };

      res.render("option", { data: quick });

    } else if (req.body.submit == 'account') {
      quick = null;
      res.render("login", {message:0});
    }
 // Pass findOneResult as an object
  } catch (err) {
    console.log(err);
  }
});

app.post('/option', async (req, res) => {
  try {
    if (req.body.submit == 'submit') {
      var username = req.body.username;
      var email = req.body.email;
      var password = req.body.pswd;
      findOneResult = await find(username, email, password, req.body.submit);
      if(findOneResult == null)
        res.render("avatar");
      else{
        res.render('login', { message: 'Oops! You already have an account. Please try logging in' });
      }

    } else if (req.body.submit == 'login') {
      const email = req.body.email1;
      const password = req.body.pswd1;
      findOneResult = await findLogin(email, password);
      if(findOneResult != null){
        const jsonData = {
          username: findOneResult['username'],
        };
          res.render("option", { data: jsonData });
    }else{
      res.render('login', { message: 'Login unsuccessful. Please try again.' });
    }
  }
  } catch (err) {
    console.log(err);
  }
}); 

app.post('/game', async (req, res) => {
  try {
    const dataToRender = quick == null ? userJSON : quick;
    if (req.body.submit == 'bot') {
      console.log(dataToRender);
      res.render("main", { data: dataToRender });
    } else if (req.body.submit == 'create') {
      res.render("generatecode", {data: dataToRender});
    } else if (req.body.submit == 'join') {
      res.render("entercode", {data: dataToRender});
    } else{
      res.render("entercode", {data: dataToRender});
    }
  } catch (err) {
    console.log(err);
  }
}); 

app.post('/creator', async (req, res) => {
  try {
    const dataToRender = quick == null ? userJSON : quick;
    const response = await axios.post('http://localhost:5000/groupmain', dataToRender);

    // Process the response as needed
    console.log('Response from port 5000:', response.data);

    // Send a response to the client
    res.send('Form submitted successfully!');
  } catch (err) {
    console.log(err);
  }
});

app.post('/joinroom', async (req, res) => {
  try {
    const dataToRender = quick == null ? userJSON : quick;
    const response = await axios.post('http://localhost:5000/groupmain', dataToRender);

    // Process the response as needed
    console.log('Response from port 5000:', response.data);

    // Send a response to the client
    res.send('Form submitted successfully!');
  } catch (err) {
    console.log(err);
  }
});

app.post('/profile', async (req, res) => {
  res.render("profile", {data: userJSON});
});

app.post('/avatar', async (req, res) => {
  try {
    const avatar = req.body.submit;
    insertAvatar(avatar, userJSON[0]['_id']);
    res.render("option", {data: userJSON[0]});
  }catch(error){
    console.log(error);
  }
});

app.post('/points', async (req, res) => {
  try {
    const points = req.body.points;
    res.render("points", {data: points});
  }catch(error){
    console.log(error);
  }
});

app.post('/updateprofile', async (req, res) => {
  try {
    var username = req.body.username;
    if(req.body.newPassword == ''){
      var password = userJSON['password'];
    }else{
      var password = req.body.newPassword;
    }

    updateProfile(username, password);
    const dataToRender = quick == null ? userJSON : quick;
    console.log(dataToRender);
    res.render("main", { data: dataToRender });

  }catch(error){
    console.log(error);
  }
});

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


app.listen(3000, () => {
  console.log("Server started on port 3000");
});