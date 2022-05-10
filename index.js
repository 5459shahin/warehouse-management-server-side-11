const { MongoClient, ServerApiVersion } = require('mongodb');
const express =  require ('express');
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5dfou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
     try{
         await client.connect();
         const bicycleCollection=client.db('bicycle').collection('service');

         app.get('/item', async (req,res)=>{
            const query={};
            const cursor=bicycleCollection.find(query);
            const items=await cursor.toArray();
            res.send(items);
            console.log(items);

         })
         
         
     }
     finally{

     }
    };
  
run().catch(console.dir);

app.get('/', (req, res) => {

    res.send('hello')

})
 app.listen(port,()=>{
     console.log('site is rauning on port');
 })