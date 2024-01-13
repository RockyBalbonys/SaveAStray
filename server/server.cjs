const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body

app.get('/', (req, res) => {
    console.log("Hello world!");
    console.log(req.url);
    res.send('Hello world!');
});

app.post('/api/ping', (req, res) => {
    console.log("Received a POST request!");
    console.log("Received data:", req.body); // Assuming you are sending JSON data
    res.json({ message: 'POST request received!' });
});

app.listen(port, () => {
    console.log("Connected to PORT ", port);
});
