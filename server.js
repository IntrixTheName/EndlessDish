const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")
const mongoose = require("mongoose")
const path = require('path')
const cors = require('cors')
const { exec } = require('child_process')

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors())


//Configure database connection & schemas
/*let MongoClient = require('mongodb').MongoClient
MongoClient.connect("mongodb://localhost:27017/endless-dish", function(err, db) {
  if(err) throw err;
  console.log("Connected to mongo:endless-dish")
  db.close
})*/
mongoose.connect("mongodb://localhost:27017/endless-dish")
const RecipeModel = require('./models/recipe')

//Configure Multer transactions
const Recipe = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "./library/submitted_recipes/")},
  filename: (req, file, cb) => {cb(null, "temp")}
})
const SubmitRecipe = multer({storage: Recipe})

//Utility
async function query(model, search_for = null) {
  try {
    const results = await model.find(search_for)
    return results
  } catch (error) {
    console.log(`Unsuccessful query, model=${model} search_for=${search_for}, ${error}`)
    return []
  }
}


// RECIPES --------------------------------------------------------------------

app.get("/get/recipes", async (req, res) => {
  try {
    const results = await query(RecipeModel)
    res.json(results)
  } catch (error) {
    console.error("Error in /get/recipes route:", error)
    res.status(500).json({err: "Internal Server Error"})
  }
  
})

app.get("/get/recipes/download/:id", async (req, res) => {
  res.download(path.join(__dirname, `./library/recipes/${req.params["id"]}`))
})

app.get("/get/recipes/template", async (req, res) => {
  res.download(path.join(__dirname, "./public/Endless Dish Template.dotx"))
})

// ! Implement submissions in a later version, not prepared to handle input at this time
/*
app.post("/post/recipes/submit-recipe", SubmitRecipe.single("doc"), async (req, res) => {
  try{
    const form_data = req.body
    if (form_data == {}) { throw new Error("No form data received"); }

    const recipe_data = new RecipeModel({
      title: req.body["name"],
      desc: req.body["desc"],
      tags: req.body["tags"],
      doc: ""
    })

    const doc = await recipe_data.save()
    exec(`mv ./library/submitted_recipes/temp ./library/submitted_recipes/${doc._id}`)

    res.status(200).json({message: "Submission accepted", ticket: doc._id})
  } catch(err) {
    console.error("Error handling form data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
})

app.post("/post/recipes/new-recipe", async (req, res) => {
  try {
    const formData = req.body
    if (formData == {}) {throw new Error("No form data recieved")}
  } catch {
    console.log("Oh Well")
  }
})
*/

app.listen(PORT)