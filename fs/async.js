const fs = require('fs');
const path = require('path');

/**
 * fs.writeFile()
 */

let fileName = "asyncTest.txt";
let filepath = path.join(__dirname,fileName);

const write = fs.writeFile(filepath,"This is async function data",'utf-8', (err) => {
    if (err != null) {
        console.log(err);
    }
    console.log("File has been save");
})

let read = fs.readFile(filepath,'utf-8',(err,data) => {
    if(err != null) {
        console.log(err);
    }
    console.log(data);
    
});

console.log(read);


