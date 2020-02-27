const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const app = express();

const MONGO_URI = "mongodb://sri:sri@cluster0-shard-00-00-m6hr7.mongodb.net:27017,cluster0-shard-00-01-m6hr7.mongodb.net:27017,cluster0-shard-00-02-m6hr7.mongodb.net:27017/UserMgmt?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

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

