require('dotenv').config()
const express =  require('express')
const itemRoutes = require('./routes/items')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use((req,res,next)=>
{
    console.log(req.path,req.method)
    next()
})

app.use('/api/items',itemRoutes)

//connectDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, () =>
            {console.log('Connected to and Listening ')
            console.log('Port:', process.env.PORT);
            
            
            })
    })
    .catch((error)=>
    {
        console.log(error)
    })





