// app.js
const express = require('express')
const cors = require('cors')
const contactRouter = require('./routes/contact.route')
const apiError = require('./api-error')
// Create Express app
const app = express()

app.use(cors())
app.use(express.json())
// A sample route
app.get('/', (req, res) => res.send('Chao mung ban den voi App cua Hung!'))

app.use("/api/contacts",contactRouter)

// error 404 khi ko co route nao trung
app.use((req,res,next)=>{
    return next(new apiError(404,"Not Found"))
})
//xu ly loi
app.use((err,req,res,next)=>{
    return res.status(error.statusCode || 500).json({
        message: error.massage || "Internal Server Error"
    })
})

//export mode
module.exports=app