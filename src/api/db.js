/* db.js --- Database driver for the website */

const { promisify } = require('util');
const { scryptSync, randomBytes, timingSafeEqual, randomInt } = require('crypto');
const sqlite3 = require('sqlite3').verbose();

//Create connection to the database
const database = new sqlite3.Database('./database/prod.db');
console.log("Database connected")

//"Promisify" the main functions (can await the functions now, makes queries simpler)
const dbRun = promisify(database.run.bind(database))
const dbGet = promisify(database.get.bind(database))
const dbAll = promisify(database.all.bind(database))
dbGet("SELECT username FROM users WHERE user_id = 0").then((res) => {console.log(`Sample query result: ${res.username}`)})

//Handle the graceful closing of the database connection when process stops
process.on('SIGINT', () => {
    database.close((err) => {
        if(err) {console.error('Error closing the database connection:', err.message)}
        console.log('Database connection closed')
        process.exit(0)
    })
})



//User Manipulation ------------------------------------------------------------
/**
 * Gets and returns the test account from the database for testing purposes
 * @returns {object} The user Cove_Holden (test account)
 */
async function debug_get_user() {
    //Select Cove from the user table to test db connection
    return dbGet("SELECT * FROM users WHERE user_id = 0").then((user) => {
        if(!user) {return {err: "User not found", username: "err", email: "err"}}
        return user
    })
}

/**
 * Sign up users
 * @param {string} username Entered username
 * @param {string} pwd Entered password
 */
async function signup(username, pwd) {
    try {
        const salt = randomBytes(16).toString('hex'); //Generate random salt
        const pwd_hash = scryptSync(pwd, salt, 64).toString('hex'); //Hash the password with salt
        const result = await dbGet("SELECT max(user_id) as max_id FROM users") //Get the current highest user ID
        let new_user_id = (result.max_id !== null) ? result.max_id + 1 : 2; //Start with ID = 2 if no existing users (0 = test, 1 = Brad)

        dbRun("INSERT INTO users VALUES(?, ?, ?, NULL, 'user')", [new_user_id, username, `${salt}:${pwd_hash}`])
    } catch (err) {
        console.error('Error during user signup:', err)
    } 
}

/**
 * Verifies the entered credentials and confirms that a login is valid
 * @param {string} username 
 * @param {string} pwd 
 * @returns {boolean} Whether login credentials are valid
 */
async function login_verify(username, pwd) {
    try {
        let record = await dbGet(`SELECT pwd_hash FROM user WHERE username = ${username};`); //Grab record with assoc. username
        const [salt, key] = record.pwd_hash.split(':') //Split it into the salt & hash
        return (key == scryptSync(pwd, salt, 64).toString('hex')) //Compare, return true if hashes match
    } catch (err) {
        console.error('Error during login:', err)
        return false
    }
}

/**
 * Delete a user from the database
 * @param {string} username 
 * @param {string} pwd 
 */
async function delete_user(username, pwd) {
    let verified_user = await login_verify(username, pwd);
    if(verified_user) {
        dbRun("DELETE FROM starred_recipes WHERE user_id = (SELECT user_id FROM users WHERE username = ?)", [username])
    }
}



//Recipe Card Functions --------------------------------------------------------

function submit_recipe(title, summary) {} //TODO - Implement Function

function edit_review(id, field, overwriting_value) {
    
}

function review_recipe(id, decision) {} //TODO - Implement Function

function commit_recipe(id, decision) {} //TODO - Implement function

/**
 * Retrieve a recipe from the database
 * @param {int} id The id of the recipe to grab 
 */
async function get_recipe(id) {
    //Note: Filename is assumed based on the ID. Titles *should* be unique, but that may change with time
    let recipe = await dbGet("SELECT recipe_id, owner, title, summary FROM recipes WHERE recipe_id = ?", [id])
    return recipe
}

/**
 * Retrieves all recipes from the database
 * @param {int} [limit=null] Optional, limit the number of rows returned
 */
async function get_recipes(limit = null) {
    let recipe = await dbAll(`SELECT recipe_id, owner, title, summary FROM recipes${limit === null ? "" : ` LIMIT ${limit}`}`)
    return recipe
}

function update_recipe() {}  //TODO - Implement Function

function add_recipe_flaire() {} //TODO - Implement Function

function delete_recipe() {}  //TODO - Implement Function


module.exports = {
    debug_get_user,
    signup,
    get_recipe,
    get_recipes
}