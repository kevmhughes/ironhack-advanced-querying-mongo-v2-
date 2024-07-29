require("dotenv").config();

const dbURI = process.env.MONGO_URI;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = dbURI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    
    const database = client.db("companiesDB")

    const companies = database.collection("companies")

    const query = {}

const options = {
        projection: { _id: 0, name: 1, number_of_employees: 1},

        sort: {number_of_employees: -1},

        limit: (10)
    } 

    // Ejecutar la consulta 
    const cursor = companies.find(query, options);
    // Print a message if no documents were found
    if ((await companies.countDocuments(query)) === 0) {
        console.log("No documents found!");
    }

    for await (const doc of cursor) {
        console.dir(doc);
    }


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
