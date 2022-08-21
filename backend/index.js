const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')
const cors = require('cors')
const http =  require('http');
// const { graphqlHTTP } = require('express-graphql');

const schema = require('./GraphQl/schema')
const resolver = require('./GraphQl/resolver')
const authMiddleware = require('./middleware/auth')
require('dotenv').config()
const port = process.env.PORT || 8080;
const app = express();
const corsOptions = {
  origin: ['http://192.168.1.32:3000', 'http://localhost:3000'],
  optionsSuccessStatus: 200,
  credentials: true 
}
//corsOptions
app.use(cors(corsOptions))
const server  = http.createServer(app)
const db = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.7lv5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`



app.use(authMiddleware);
app.use('/gre', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}))

// database connection
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
  .then((res) => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});



// listen for requests
server.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});