import express from "express";
import {PORT} from "./env.js";

const app = express();

// Route creation with get 
app.get('/', (req,res) => {
    res.send("<h1>Hello World from express js</h1>");
})

// // start the server 
// const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})