const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const app = express();
const  port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvgc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("carMechanic");
      const servicesCollection = database.collection("services");
      // create a document to insert

    //   GET API 
    app.get('/services' , async(req , res)=>{
        const cursor = servicesCollection.find({})
        const result = await cursor.toArray()
       res.send(result)
    
    })

    //  POST API 
    app.post('/services' , async(req , res)=>{
        const services = req.body
        const result = await servicesCollection.insertOne(services)
       res.json(result)
    
    })

    // DELETE API 
    app.delete('/services/:id', async(req, res) => {
        const id = req.params.id
        const query = {_id: ObjectId(id)}
        const result = await servicesCollection.deleteOne(query)
        res.send(result);
    });


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


  app.get('/' , (req , res)=>{
  
     res.send('hello from simple server :)')
  
  })
  
  app.listen(port, () => {
      console.log(`Server started on port`, port);
  });