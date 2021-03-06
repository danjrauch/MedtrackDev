const db = require("./db.js")
const bcrypt = require('bcrypt')

module.exports = {
  checkUser
}

async function checkUser(username, password) {
  try{
    const user = await db.query({
      name: 'fetch-user',
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username]
    })
    if(user.length == 0){
      return 'signup'
    }
    const match = await bcrypt.compare(password, user[0].passwordhash) 

    if(match) {
      return 'successful'
    }
    else{
      return 'unsuccessful'
    }
  }catch (err){
    console.log(err.stack)
  }
}