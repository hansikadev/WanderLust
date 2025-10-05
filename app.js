const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const path=require('path');

const  MONGO_URL="mongodb://127.0.0.1:27017/WanderLust";

main().then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Hello World");
});

//index route
app.get("/listings" ,async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index",{allListings});
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
});

//show route
app.get("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
})

//create route
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
});


// app.get("/testlisting",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa",
//         description:"By the beach", 
//         image:"",
//         price:1200,
//         location:"Calangute,goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("Sample listing saved");
//     res.send("Sample listing created and saved to database");
// })

app.listen(8080, ()=>{
    console.log("Server started"); // 🔗 Added the full URL
});