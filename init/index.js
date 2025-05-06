const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js')
const { initialize } = require('passport')
// const dbUrl =process.env.ATLASDB_URL; 

const dbUrl='mongodb+srv://delta-varsha:VarshaWanderlust@cluster0.hazcpld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
main().then(()=>{
    console.log("Connected to mongoose")
}).catch((e)=>{
    console.log(e)
})

async function main(){
    await mongoose.connect(dbUrl)
}




const intiDB= async ()=>{
  await   Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"6818658cc24a649dd02896d6"}))
  await  Listing.insertMany(initData.data)
    console.log("Inserted data succesfully")
}

intiDB();

