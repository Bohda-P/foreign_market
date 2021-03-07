const express = require('express')
const mongoose = require('mongoose')
const router = require('./routers/route.js')

const app = express()
const PORT  = process.env.PORT || 8080
app.use(express.json({extended: true}))
         
app.use('/', router)

const start = async() => { 
    await mongoose.connect('mongodb+srv://bohdan:1234@cluster0.cvest.mongodb.net/Regions?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }) 
    app.listen(PORT, () => {console.log(`Server has been launched at port ${PORT}`)})
}
start()
