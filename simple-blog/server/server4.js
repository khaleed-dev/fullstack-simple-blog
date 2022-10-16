// express with ejs (view engine) server
const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose')
const blogRoutes = require('../routes/blogRoutes')

const app = express();

const PORT = process.env.PORT || 3000
const dbURI = 'mongodb+srv://khaled235621:01525133640@hellomongo.2ialsne.mongodb.net/HelloMongo?retryWrites=true&w=majority'
// or - 'mongodb://localhost:27017/test'

// Connecting to database
mongoose.connect(dbURI).then(() => {
    // listen for requests only after we establish a connection to the database
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}).catch(err => console.log(err))

// register view engine (ejs)
app.set('view engine', 'ejs');

// middlewares & static files
app.use(express.static('puplic')) // serve static files
// what is urlencoded?
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.urlencoded({ extended: true })) 
app.use((req, res, next) => {
    console.log(req.hostname, req.method, req.path)
    next()
})
// Routes
app.get('/', (req, res) => {
    // replace static blogs with blogs from database.
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})
// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})



