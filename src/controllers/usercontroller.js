const jwt = require('jsonwebtoken');
require('dotenv').config();


const {addUser, checkUser} = require('../in-memory-DB/users');

// Secret key used to sign JWT tokens
const secretKey =  process.env.SECRET_KEY;

// sign up
const signupcontroller = async (req, res) => {
  const { username, password } = req.body.user;

  try{  

        let flag = await addUser(username , password);

        console.log(flag);
        if( flag){

        


            const token = jwt.sign({ username: username }, secretKey);

            console.log(username, token);

            res.status(200).json({ username, token });



    
        } else {
            res.status(400).json({ error: "a user already exists with this username try with another username"});
        }

    }
    catch(e){

        res.status(400).json({ error: e});


    }



  
}



const logincontroller = async(req, res) => {
    const { username, password } = req.body.user;

    try {
        const isAuthenticated = await checkUser(username, password);
        if (isAuthenticated) {
            // Authentication successful

            const token = jwt.sign(username, secretKey);

            res.status(200).json({ username, token });
            
        } else {
            // Authentication failed
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        // Error occurred during authentication
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
}


module.exports = {

    logincontroller, signupcontroller


}
