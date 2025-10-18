const path = require('path');
const fs = require('fs');
const { error } = require('console');

let folderpath = path.join(__dirname,'promiseCRUD.txt');

/**
 * Create : fa.promise.writeFile(folderpath,data,optional).then().catch()
 */

fs.promises.writeFile(folderpath,"File is created through the Promise",'utf-8').then(() => {
    console.log("File is created");
}).catch((err) => {
    console.log(err);
})

/**
 * fs.promises.appendFile(folderpath,data,optional).then().catch()
 */

fs.promises.appendFile(folderpath,"\nNew Rule is added",'utf-8').then(() => {
    console.log("Data Append Successfully");
}).catch((error) => {
    console.log(error);
})

/**
 * read the file using the Promise 
 */

fs.promises.readFile(folderpath,'utf-8').then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
});

/**
 * fs.promises.unlink(folderpath).then().catch()
 */

fs.promises.unlink(folderpath).then(() => {
    console.log("File is deleted Successfully");
}).catch((error) => {
    console.log(error);
});