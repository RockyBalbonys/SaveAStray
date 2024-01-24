const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const uri = 'mongodb+srv://Lyfie:pass123@dbsas.mtpeotb.mongodb.net/';

//db connection >>
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to db");
    }).catch(() => {
        console.log("error");
    });

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body

app.get('/', (req, res) => {
    console.log("Hello world!");
    console.log(req.url);
    res.send('Hello world!');
});

app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({ status: 'ok '})
})


app.listen(port, () => {
    console.log("Connected to PORT ", port);
});
