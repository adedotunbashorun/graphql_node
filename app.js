const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');

const resolver = require('./graphql/resolvers');

const app = express();


app.use(bodyParser.json());


app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-twi1m.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() =>{
    app.listen(3000);
})
.catch((error) => {
    console.error(error)
})