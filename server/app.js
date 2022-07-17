const express = require('express');
const cors = require('cors');
const path = require('path');


const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json()); 

const verifyUserToken = (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    if(token === 'null'){
        res.json({error: 'No Access Token'});
    } else if (User.verifyToken(token)){
        req.user = token.split('-')[0];
        next();
    }
    else{
        res.json({error: 'Invalid Token'});
    }
}

app.use('/images', express.static(path.join(__dirname, 'public', 'assets', 'images')))

app.use('/users', userRouter);
app.use('/products', verifyUserToken, productRouter);
app.use('/cart', verifyUserToken, cartRouter);

app.use((error, req, res, next)=>{
    res.status(500).json({error: error.message});
});


app.listen(3000, ()=>console.log('listen on 3000'));