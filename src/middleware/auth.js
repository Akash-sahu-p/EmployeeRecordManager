require('dotenv').config();

const jwt = require('jsonwebtoken');

const secretKey =  process.env.SECRET_KEY;








const authMiddleware = async (req, res, next) => 

{
    // Extract token from headers

    console.log(req.headers)
    
    // const {token } = req.headers;

    const token = req.headers.authorization.split(' ')[1]

    const requsername = req.body.username;



    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        
        

        const {username} = jwt.verify(token, secretKey);




       

        
        if (username.toString() === requsername.toString()) {
             next();
        } else {
            return res.status(401).json({ message: 'Token is invalid' });
        }
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Token is invalid' , error: error});
    }
}

module.exports = authMiddleware;