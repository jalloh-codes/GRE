import express from 'express';
import {graphqlHTTP}  from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import {typeDefs} from './GraphQl/typeDefs.js'
import {resolvers} from './GraphQl/resolvers.js'
import {authMiddleware} from'./middleware/auth.js'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

//   graphqlUploadExpress, // A Koa implementation is also exported.
// } = require('graphql-upload');
import * as dotenv from 'dotenv'
dotenv.config()
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


//graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
app.use(authMiddleware);
app.use(graphqlUploadExpress({ maxFileSize: 30000000, maxFiles: 10 }))
// app.use(graphqlUploadExpress());
app.use('/gre', 
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
)

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