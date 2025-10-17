//database seeding 
const mongoose=require('mongoose');
const initData=require('./data.js');
// const initData=require('./seperate.js');


const Listing=require('../models/listing.js');  

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main().then(()=>console.log("Connected to MongoDB")).catch(err=>console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
}

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data initialized");
}
initDB();