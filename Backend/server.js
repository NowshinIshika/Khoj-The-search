require('dotenv').config()
const express =  require('express')
const itemRoutes = require('./routes/items')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');

const app = express()

console.log('JWT_SECRET:', process.env.JWT_SECRET);


app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    console.log('Request Body:', req.body);  // Log the body content
    next();
});

app.use('/api/items',itemRoutes)
app.use('/auth', AuthRouter);


app.get('/ping',(req, res) => {
    res.send('PONG');
});








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





