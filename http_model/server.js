const http = require('http');

// Web Server (We create our own web server)

const server = http.createServer((req,res) => {
    if(req.url == '/') {
        res.setHeader("Content-Type","text/plain");
        res.write("Hello , I am sumit Pathak");
        res.end();
    }

    if (req.url == '/home') {
        res.setHeader("Content-Type","text/plain");
        res.write("Think outside the box , PLease think again, contact me for help, and not forget to like");
        res.end();
    }
})


const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server is started");
})