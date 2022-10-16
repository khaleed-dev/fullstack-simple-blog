const Blog = require('../models/blog')

/*
    * blog_index -> get all blogs and inject into index view
    * blog_details -> get a single blog details
    * blog_create_get -> get the form to create a new blog
    * blog_create_post -> to add a new blog to the db & view
    * blog_delete -> to delete a blog from the db & view
*/

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
      })
      .catch((err) => {
        console.log(err)
      })
}
const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id).then(result => {
        res.render('blogs/details', { blog: result , title: 'Blog Details'})
    }).catch(err => {
        console.log(err)
        res.status(404).render('404', { title: 'Blog not found' })
    })
}
const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create a new blog'});
}
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.redirect('/blogs')
    })
}
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(() => {
        res.json({ redirect: '/blogs' })
    }).catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}