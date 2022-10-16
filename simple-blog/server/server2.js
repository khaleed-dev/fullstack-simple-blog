//? support more file exstentions.

const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
    // build the file path
    let filePath = path.join(__dirname, '../frontend', req.url === '/' ? 'index.html' : req.url)
    
    // Extension of file
    let extname = path.extname(filePath)

    // Initial content type
    let contentType = 'text/html' 

    // check ext and set content type
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.js':
            contentType = 'image/png';
            break;
        case '.js':
            contentType = 'image/jpg';
            break;
    }
    
    // Read File
    fs.readFile(filePath, (err, data) => {
        if(err){
            if(err.code == 'ENOENT'){ // PAGE ISN'T FOUDND
                fs.readFile(path.join(__dirname, '../frontend', '404.html'), (err, content) => {
                    console.log(err)
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            }else{
                // some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else{
            //success
            res.writeHead(200, {'Content-Type': contentType})
            res.end(data, 'utf8')
        }
    })
});

server.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
