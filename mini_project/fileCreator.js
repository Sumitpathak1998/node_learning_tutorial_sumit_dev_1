import readline from "readline";
import { fileURLToPath } from 'url';
import fs from "fs";
import path from "path";

// Process for take user input 
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * Objective: 
 * 1) Create one text file by taking a filename from from user and also there content 
 * After that create that file.
 * 2) Append data in the file by taking a filename from user , in particular directory 
 * 3) Delete the text file  
 * 
 */

/**
 * Process: 
 * 1) Ask the User there choice 
 * 2) on the basis of choice perform the action 
 *  - If new file then first take File name , conent 
 *  - If append , then ask user to enter the file name , and if file present then ask for content 
 *  - If delete , then as user to file name , if found then delete that 
 * 3) After performing the task Again show the choices 
 * 4) If user choose exit then close the app
 */

const handleInput = (option) => {
    option = Number (option);
    if(option === 1) {
        /**
         * 1) Ask the user to enter the file name 
         * 2) check if the same name file exist or not
         * 3) if exist then new name enter 
         * 5) No then again ask for the new name  
         * 6) Insert the data inside that file 
         * 7) Show messgae "New file created successfully" 
         */
        rl.question("Enter the filename : " , (filename) => {
            let folderpath = path.join(__dirname,`${filename}.txt`);
            if(checkFileExist(filename)) {
                console.log("File name already exist, Sorry file not created !!!");
                setTimeout(() => {
                    showChoice();
                }, 500);
            } else {
                creteFileProcess(filename,folderpath);
            }
        });
    } else if(option === 2) {
        rl.question("Enter the filename : " , (filename) => {
            let folderpath = path.join(__dirname,`${filename}.txt`);
            if(!checkFileExist(filename)) {
                console.error("File not exist , in the directory");
                setTimeout(() => {
                    showChoice();
                }, 500);
            } else {
                rl.question("Enter the appended data : " , async (data) => {
                    await fs.appendFile(folderpath,data,'utf-8', (error) => {
                        if(error != null) {
                            console.error(error);
                        } else {
                            console.log("Data append successfully");
                        }
                    })
                    setTimeout(() => {
                        showChoice();
                    }, 500);
                })
            }
        });
    } else if (option === 3) {
        rl.question("Enter the filename : " , (filename) => {
            let folderpath = path.join(__dirname,`${filename}.txt`);
            if(!checkFileExist(filename)) {
                console.error("File not exist , in the directory");
                setTimeout(() => {
                    showChoice();
                }, 500);
            } else {
                fs.unlinkSync(folderpath);
                console.log("File deleted Successsfully");
                setTimeout(() => {
                    showChoice();
                }, 500);
            }
        }); 
    } else if (option === 4) {
        console.log("Thanku !!!");
        rl.close();
    } else {
        console.log("Choose correct option \n");
        showChoice();
    }
}

const creteFileProcess = (filename,folderpath) => {
    rl.question("Enter the Data : " , async (data) => {
        await fs.writeFile(folderpath,data,'utf-8', (error) => {
            if (error != null) {
                console.log(error);
            } else {
                console.log(`${filename}.txt Created Successfully`);
            }
        })
        setTimeout(() => {
            showChoice()
        },500);
    })
}

const checkFileExist = (filename) => {
    const filefound =  fs.readdirSync(__dirname,'utf-8').find((param) => {
        let [file,ext] = param.split(".");
        return (ext == 'txt' && file == filename) ? true : false;
    });
    return filefound !== undefined;
}

const showChoice  = () => {
    console.log("What Task You Wnat to Perform");
    console.log("1.Add the File");
    console.log("2.Append data in the File");
    console.log("3.Delete the File");
    console.log("4.Exit");
    rl.question("Enter the choice : ", handleInput);
}

showChoice();
