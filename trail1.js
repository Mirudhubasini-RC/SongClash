const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", async (req, res) => {
    try {
      res.render("languages", {});
    } catch (err) {
      console.log(err);
    }
  });