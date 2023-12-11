import mongoose from "mongoose";
import'dotenv/config.js'
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI,{dbName:'Simple Ts Project'});
mongoose.connection.on('error', (err) => {
    console.log(err);
});