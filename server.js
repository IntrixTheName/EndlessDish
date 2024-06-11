const express = require("express")
const bodyParser = require("body-parser")

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
  }
}


// RECIPES
app.get("/get/recipes", async (req, res) => {
  return (await query("recipes"))
})