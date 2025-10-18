const fs = require('fs');
const path = require('path'); 

/**
 * writeFileSync(filename,data,optional)
 * 
 */

let filepath = path.join(__dirname,'test.txt');

const writeFile = fs.writeFileSync(
    filepath,
    "This is initial Data for Node Sync",
    "utf-8"
);

console.log(writeFile);

/**
 * fs.readFileSync(filepath,options)
 */

// const readFile = fs.readFileSync(filepath,'utf-8');
// console.log(readFile);

// If we not use utf-8 then we need to use toString to get the data 

const readFile = fs.readFileSync(filepath);
console.log(readFile); // It give buffer or binary encoding 
console.log(readFile.toString());


/**
 * fs.appendFileSync()
 */

const append = fs.appendFileSync(filepath,"\n This is appended data in the file",'utf-8');
console.log(append);

/**
 * fs.unlinkSync() : Delete the file 
 */

// const del = fs.unlinkSync(filepath);
// console.log(del);

/**
 * rename 
 */

let newFilename = 'updateTest.txt';
let newFilePath = path.join(__dirname,newFilename);

fs.renameSync(filepath,newFilePath);







