const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c12imjm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const tasksCollection = client.db('task-manager').collection('tasks');

        app.post('/tasks', async (req, res) => {
            const task = req.body;
            console.log(task)
            const result = await tasksCollection.insertOne(task);
            res.send(result)
        });
        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = tasksCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks)
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))


app.get('/', async (req, res) => {
    res.send('Task Manager Server Working')
})
app.listen(port, () => { `Server Running on port ${port}` })