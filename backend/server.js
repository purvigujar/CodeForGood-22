const express = require('express')
const cors = require('cors')
const {database_uri,port}=require("./config/database")
const mongoose= require("mongoose")
const passport    = require('passport');
const jwt = require('./middleware/auth')
const userAuth = require("./routes/auth")
const user = require("./routes/user")

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(database_uri, { useNewURlParser: true , useUnifiedTopology: true} )
.then( () => console.log("connection successfull...")  )
.catch( (err) => console.log(err) );

app.use('/auth', userAuth);
app.use('/user', jwt,user);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})