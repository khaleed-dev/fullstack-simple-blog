const express = require('express')
const blogController = require('../controller/blogController')

const router = express.Router();

/* routes map
    * /blogs        -> GET    -> get a webpage with all blogs inside it 
    * /blogs/create -> GET    -> gets a webpage with web form on it
    * /blogs/:id    -> GET    -> gets a webpage to show a single post
    * /blogs        -> POST   -> to add a new doc to the db after submitting the form.
    * /blogs/:id    -> DELETE -> to delete a single blog document from the db
    // * /blogs/:id    -> PUT    -> to update a single blog document in the db
*/

// blog routes
router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)
router.post('/', blogController.blog_create_post)
router.delete('/:id', blogController.blog_delete)

module.exports = router;