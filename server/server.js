const express = require('express');
const cors =require('cors');
const {MongoClient} = require("mongodb");

const app =express()

const Port = 4000

url= `mongodb://127.0.0.1:27017/blackcoffer`;
const client = new MongoClient(url)

app.use(cors())
app.use(express.json())

app.get('/api/data',async (req,res)=>
{
    try{

        await client.connect()
        const collection = client.db('blackcoffer').collection('blackcofferdb');
        const data=await collection.find().toArray();
        res.json(data)
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({error:"Internal Server Errror"})
    }
})

app.listen(Port,()=>
{
    console.log(`Server is running on ${Port}`);
})