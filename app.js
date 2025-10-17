const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const path=require('path');
const methodOveride=require('method-override');
const ejsMate=require('ejs-mate');

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
app.use(methodOveride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.send("Hello World");
});

//index route 
app.get("/listings" ,async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index",{allListings});
});

// app.get("/testing" ,async(req,res)=>{
//     const allListings= await Listing.find({});
//     res.render("testing/index",{allListings});
// });

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit",{listing});
})

//show route
app.get("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
})

//create route
app.post("/listings",async(req,res)=>{
    const newlisting=new Listing(req.body.listing); //listing refers to the array that we made for the form data
    await newlisting.save();
    res.redirect('/listings');
});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body.listing);
    res.redirect(`/listings/${id}`);
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

app.listen(8080, ()=>{
    console.log("Server started"); // 🔗 Added the full URL
});