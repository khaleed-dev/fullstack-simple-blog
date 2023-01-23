/*
    * in nodeJS we have to write the code that lives on the backend to create a web server to listen for requests coming from the browser. unlike languages like php where we don't have to create the server manually and we have tools like Apache or Nginx to do that for us.

    * node http module is used to create a web server that listens for requests coming from the browser and sends back responses to the browser.

    * this is some of nodeJS http module's methods:
        - createServer() - creates a web server
        - listen() - starts the server and listens for requests
        - writeHead() - writes a response header to the response stream
        - write() - writes a response body to the response stream
        - end() - ends the response stream
        - on() - attaches an event handler to the server object
        - req - request object
        - res - response object
    * status codes
        - 100 range - informational resposens
        - 200 range - successful responses
        - 300 range - redirection messages
        - 400 range - user or client error responses
        - 500 range - server error responses
    * popular status codes
        - 200 - OK
        - 201 - Created
        - 301 - Moved Permanently
        - 404 - Not Found
        - 500 - Internal Server Error

*/

//? simple server 1
const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')

    let path = './frontend/'
    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            path += '404.html'
            res.statusCode = 404; 
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end()   
        }else{
            res.end(data)
        }
    })

})

server.listen(port, 'localhost', (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(`listening for requests on port ${port}`)
    }
})