const {ApolloServer, gql} = require('apollo-server-express');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const app = express();

const mongo_pwd = process.env.MONGO_URI || 'sri';
const MONGO_URI = "mongodb://sri:" + mongo_pwd + "@cluster0-shard-00-00-m6hr7.mongodb.net:27017,cluster0-shard-00-01-m6hr7.mongodb.net:27017,cluster0-shard-00-02-m6hr7.mongodb.net:27017/UserMgmt?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

const typeDefs = gql(fs.readFileSync('./graphql/schema.graphql', {encoding: 'utf8'}));
const resolvers = require('./graphql/resolvers');
const apolloServer = new ApolloServer({typeDefs, resolvers});
apolloServer.applyMiddleware({app, path: '/graphql'});

app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
            .then((res)=>{
                console.log('mongo conctd')
                app.listen(3000);
            })
            .catch((err)=>{
                console.log(err);
            });
