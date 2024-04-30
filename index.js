

const express = require('express');
require('dotenv').config();

const userroutes = require('./src/routers/userroutes');
const recordroutes = require('./src/routers/recordrouter')




// express app
const app = express()

// middleware
app.use(express.json())


// for parsing the  incoming https requests 
app.use(express.urlencoded({ extended: true }))



// logging for debug 

app.use((req, res, next) => {
    console.log(req.path, req.method)

    console.log(req.body);
    next()
})


// user routes 

app.use('/api/user', userroutes);


// records routes


app.use('/api/record', recordroutes);




try {
    app.listen(process.env.PORT, () => {
    console.log(' listening on port', process.env.PORT)
  })


}
catch{

    console.error(" there was a problem in staring ");
}












