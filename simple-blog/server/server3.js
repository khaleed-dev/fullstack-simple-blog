// simple server with express 
const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend'));


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './frontend'})
})
app.get('/about', (req, res) => {
    res.sendFile('about.html', {root: './frontend'})
})

