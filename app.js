const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const resolver = require('./graphql/resolvers');

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');

    if(req.method === "OPTIONS") return res.sendStatus(200);
    next();
})

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-twi1m.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() =>{
    app.listen(8000);
})
.catch((error) => {
    console.error(error)
})