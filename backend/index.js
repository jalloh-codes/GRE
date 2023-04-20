import express from 'express';
import {graphqlHTTP}  from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import {typeDefs} from './GraphQl/typeDefs.js'
import {resolvers} from './GraphQl/resolvers.js'
import {authMiddleware} from'./middleware/authanticate.js'
import {authorize} from './middleware/authorize.js'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import { GraphQLError } from 'graphql';
import * as dotenv from 'dotenv'
import {environment} from './enviroment.js'
dotenv.config()
const port = process.env.PORT || 8080;
const app = express();

const allowedOrigin = environment

const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: function (origin, callback){
        if(!allowedOrigin.includes(origin)){
          let msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
}

app.use(cors(corsOptions))
const server  = http.createServer(app)
const db = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.7lv5k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(authorize);
app.use(authMiddleware);
app.use(graphqlUploadExpress({ maxFileSize: 30000000, maxFiles: 10 }))


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


server.listen(port, () => {
    console.log(`Server is running on port ${port}.`, process.env.APP_ENV);
});