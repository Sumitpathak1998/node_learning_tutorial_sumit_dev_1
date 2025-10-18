const fs = require('fs/promises');
const path = require('path');

let folderPath = path.join(__dirname,'asyncawait.txt');

const createFolder = async() => {
    try {
        await fs.writeFile(folderPath,"This is async and await text file",'utf-8');
        console.log("File is created");
    } catch (err) {
        console.log(err);
    }
}

const readFile = async() => {
    try{
        let data = await fs.readFile(folderPath,'utf-8');
        console.log(data);
    }catch(err) {   
        console.log(err);
    }
}

const appendData =  async () => {
    try {
        await fs.appendFile(folderPath,"\nNew Data appended",'utf-8');
        console.log("Appended the data");
    } catch (error) {
        console.log(error);
    }
}

const deleteFile = async() => {
    try {
        await fs.unlink(folderPath);
        console.log("File is deleted");
    } catch (error) {
        console.log(error);
    }
}

async function executeCrud() {
    await createFolder();
    await appendData();
    await readFile();
    await deleteFile();
}

executeCrud();