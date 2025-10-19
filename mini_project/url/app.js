import http from "http";
import fs, { link, writeFile } from "fs";
import path from "path";
import { json } from "stream/consumers";

const PORT = 3002;
const DATE_FILE = path.join("data","links.json");

const serverFile = async (res,folderpath,content_type) => {
    try {
        let data = await fs.promises.readFile(folderpath);
        res.writeHead(200 , {'content-type':content_type});
        res.end(data);
    } catch (error) {
        res.writeHead(404 , {'content-type': 'text/html'});
        res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
    }
}

const loadLink = async () => {
    try {
        const links =  await fs.promises.readFile(DATE_FILE,"utf-8");
        console.log(links);
        return (links != '') ? JSON.parse(links) : {};
    } catch (error) {
        if (error.code == "ENOENT") {
            await fs.promises.writeFile(DATE_FILE,JSON.stringify({}));
            return {};
        }
        throw error;
    }
}

const saveLinks = async(links) => {
    try {
        await fs.promises.writeFile(DATE_FILE,JSON.stringify(links),"utf-8");
    } catch (error) {
        console.log(error);
    }
}
const server = http.createServer( async (req,res) => {
    if(req.method == "GET") {
        if(req.url == '/') {
            serverFile(res,path.join('public','index.html'),'text/html');
        } else if (req.url == '/style.css') {
            serverFile(res,path.join('public','style.css'),'text/css');
        } else if (req.url == "/links") {
            const links = await loadLink();
            res.writeHead(200,{"Content-Type" : "application/json"});
            res.end(JSON.stringify(links));
        } else {
            const links = await loadLink();
            const shortCode = req.url.slice(1);
            if(links[shortCode]) {
                // 302 status code use for re-direct status code 
                res.writeHead(302,{ location : links[shortCode] });
                return res.end();
            }

            res.writeHead(404, {"Content-Type" : "text/plain"});
            res.end("Link not present");
        }
    } 
    if (req.method === "POST" && req.url === "/shorten") {  
        const links = await loadLink();
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })

        req.on("end" , async () => {
            const {url,shortCode} = JSON.parse(body);

            if (!url) {
                res.writeHead(400,{"Content-Type" : "text/plain"});
                return res.end("URL is required");
            }
            if (!shortCode) {
                res.writeHead(400,{"Content-Type" : "text/plain"});
                return res.end("ShortCode is required");
            }

            let finalShortCode = shortCode;
            // Here we check that particular short code already exist 
            if(finalShortCode in links) {
                res.writeHead(400,{"Content-Type" : "text/plain"});
                return res.end("Short Code already exist, please select another");
            }

            links[finalShortCode] = url;
            await saveLinks(links);

            // Once all thing are done we just pass the message 
            res.writeHead(200,{"Content-Type" : "application/json"});
            res.end(JSON.stringify({success : true , shortCode : finalShortCode}));
        })
    }
})

server.listen(PORT,() => {
    console.log("Server is running at localhost://3002");
})