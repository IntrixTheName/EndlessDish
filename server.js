const {
  debug_get_user,
  get_recipe,
  get_recipes,
  signup,
  login_verify,
  submit_recipe,
  get_submissions } = require('./src/api/db')
const express = require('express')
const { json } = require('body-parser')
const multer = require("multer")          
const { join } = require('path')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

console.log("Initiated server.js")

const app = express()
const PORT = 5000

app.use(json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));



//Configure Multer transactions
const Recipe = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "./recipe_cards/")},
  filename: (req, file, cb) => {cb(null, "temp.docx")}
})
const SubmitRecipe = multer({storage: Recipe})

app.get("/debug/test", (req, res) => {
  res.json({message: "Pinged server.js, successful"})
})

app.get("/debug/user", async (req, res) => {
  console.log("Reached /debug/user route")
  try {
    debug_get_user().then((Cove) => {
      console.log(`Server.js recieved user: ${Cove.username}`)
      res.json(Cove)
    })
  } catch (err) {
    console.log(`Error in Debug User route: ${String(err)}`)
    res.status(500).json({err: `Error in debug/user: ${err}`})
  }
})



// USERS ----------------------------------------------------------------------

app.post("/signup", async (req, res) => {
  signup(req.body['username'], req.body['password'])
})

app.get("/login", async (req, res) => {

})



// RECIPES --------------------------------------------------------------------

app.get("/get/recipes", async (req, res) => {
  try {
    get_recipes().then((results) => {res.json(results)})
  } catch (error) {
    console.log("Error in /get/recipes route:", error)
    res.status(500).json({err: "Internal Server Error"})
  }
  
})

app.get("/get/submissions", async (req, res) => {
  try {
    get_submissions().then((results) => {res.json(results)})
  } catch (error) {
    console.log("Error in /get/submissions route:", error)
    res.status(500).json({err: "Internal Server Error"})
  }
})

app.get("/get/submissions/download/:id", async (req, res) => {
  res.download(join(__dirname, `./recipe_cards/review/${req.params["id"]}.docx`))
})

app.get("/get/recipes/download/:id", async (req, res) => {
  res.download(join(__dirname, `./recipe_cards/published/${req.params["id"]}`))
})

app.get("/get/recipes/template", async (req, res) => {
  res.download(join(__dirname, "./public/Endless Dish Template.dotx"))
})

app.post("/post/recipes/submit-recipe", SubmitRecipe.single("doc"), async (req, res) => {
  try{
    //Recieve & validate information
    const {title, desc} = req.body
    if (!title || !desc) throw new Error(`Title or Description Null:\n${title}\n${desc}`);

    //Insert recipe into database
    const recipe_id = await submit_recipe(title, desc);

    //Save & rename file
    const filepath = path.join(__dirname, "recipe_cards", "review", `${recipe_id}.docx`)
    //fs.rename(req.file.path, filepath, (err) => {
    //  if(err) throw new Error("Error renaming file");
    //})
    fs.copyFileSync(path.join(__dirname, "recipe_cards", "temp.docx"), filepath)
    fs.rmSync(path.join(__dirname, "recipe_cards", "temp.docx"))

    //Send the confirmation status
    res.status(200).json({message: "Submission successful", ticket: recipe_id})
  } catch(err) {
    console.error("Error handling form data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
})

app.post("post/recipes/overwrite-submitted-recipe", SubmitRecipe.single("doc"), async (req, res) => {
  const temp_id = req.body.temp_id;
  const filepath = path.join(__dirname, "recipe_cards", "submitted", `${temp_id}.docx`)
  fs.copyFileSync(path.join(__dirname, "recipe_cards", "temp.docx"), filepath)
})



const server = app.listen(PORT, () => {console.log(`Server running on ${PORT}`)})
server.setTimeout(60000)