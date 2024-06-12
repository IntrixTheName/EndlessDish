const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")
const mongoose = require("mongoose")

const app = express()
const PORT = 5000

app.use(bodyParser.json())


//Configure database connection & schemas
const {MongoClient} = require("mongodb")
const Mongo = new MongoClient("mongodb://localhost:27017/endless-dish")

//Utility
async function query(collection, search_for = {}) {
  try {
    await Mongo.connect()
    return Mongo.db().collection(collection).find(search_for)
  } catch {
    console.log(`Unsuccessful query, collection=${collection} search_for=${search_for}`)
    return {}
  }
}


// RECIPES
app.get("/get/recipes", async (req, res) => {
  res.json(await query("recipes"))
})

app.get("/get/recipes/:id", async (req, res) => {
  res.json(await query("recipes", {_id: req.params["id"]}))
})

app.get("/get/recipes/download/:id", async (req, res) => {
  res.download(`./library/${req.params["id"]}.docx`)
})

app.post("/post/recipes/new-recipe", async (req, res) => {
  try {
    const formData = req.body
    if (formData == {}) {throw new Error("No form data recieved")}

    
  }
})

app.listen(PORT)