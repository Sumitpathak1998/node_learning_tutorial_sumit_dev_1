import http from "http";
import fs from "fs";
import path, { join } from "path";
import { json } from "stream/consumers";

const folderPath = path.join("data","student.json");
const PORT = 3003;
const server = http.createServer( async (req,res) => {
    if (req.method == 'GET') {
        if (req.url == '/') {
            try {
                let data = await fs.promises.readFile(path.join("public","index.html"),'utf-8');
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.end(data);
            } catch (error) {
                res.writeHead(404 , {'content-type': 'text/html'});
                res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
            }
        } else if (req.url == "/style.css") {
            try {
                let data = await fs.promises.readFile(path.join("public","style.css"),'utf-8');
                res.writeHead(200, {"Content-Type" : "text/css"});
                res.end(data);
            } catch (error) {
                res.writeHead(404 , {'content-type': 'text/html'});
                res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
            }
        } else if (req.url == "/showStudent") {
            try {
                let data = await loadStudentDetails();
                res.writeHead(200, {"Content-Type" : "application/json"});
                res.end(JSON.stringify(data));
            } catch (error) {
                res.writeHead(404 , {'content-type': 'text/html'});
                res.end("<h1 style = 'text-align:center'>404 Page not Found</h1>");
            }
        }
    } 
    if (req.method === "POST" && req.url == "/student_registration") {
        
        let studentDetails = "";
        req.on("data", (chunk) => {
            studentDetails += chunk;
        })
        req.on("end" , async () => {
            const allStudentDetails = await loadStudentDetails();

            const student = JSON.parse(studentDetails);
            // check all fileds are fill or not
            let checkFiledResponse = checkAllFileds(student);
            if (!checkFiledResponse["success"]) {
                res.writeHead(400,{"content-type" : "text/plain"});
                return res.end(`${checkFiledResponse[field]} is required field`);
            } 

            // check percentage 
            const checkPercentageResponse = checkPercentage(student["percentage"]);
            if (!checkPercentageResponse.success) {
                if (checkPercentageResponse.user != "") {
                    res.writeHead(400,{"content-type" : "text/plain"});
                    return res.end(`Student Percentage is below the Cut-off`);
                } else if (checkPercentageResponse.inputType != '') {
                    res.writeHead(403,{"content-type" : "text/plain"});
                    return res.end(`Enter the proper percentage`);
                }
            }

            // check Minimum age cratiria 
            if( student.age < 21) {
                res.writeHead(403,{"content-type" : "text/plain"});
                return res.end(`Enter the proper percentage`);
            }

            // check email for duplicaticy
            if(checkEmail(student.mail,allStudentDetails)) {
                res.writeHead(403,{"content-type" : "text/plain"});
                return res.end(`Enter another email, aplready present`);
            }

            allStudentDetails[student["name"]] = student;
            await saveStudentDetails(allStudentDetails);

            // Once all thing are done we just pass the message 
            res.writeHead(200,{"Content-Type" : "application/json"});
            res.end(JSON.stringify({success : true , message : `${student["name"]} Registred Successfully`}));
        })
    }
})

const saveStudentDetails = async (data) =>  {
    await fs.promises.writeFile(folderPath,JSON.stringify(data),"utf-8");
}

const checkEmail = (current_email,allStudentDetails) => {
    const emails = Object.entries(allStudentDetails).reduce((acc,[key,value]) => {
        acc.push(value.mail);
        return acc;
    } , []);

    return emails.includes(current_email); 
}

const loadStudentDetails = async () => {
    try {
        const data = await fs.promises.readFile(folderPath,"utf-8");
        return (data != "") ? JSON.parse(data) : {};
    } catch (error) {
        if (error.code == "ENOENT") {
            await fs.promises.writeFile(folderPath,JSON.stringify({}));
            return {};
        }
        throw error;
    }
}

const checkPercentage = (percentage) => {
    let response = {success : true , inputType : "" , user : ""};
    percentage = Number (percentage);
    if (!isNaN(percentage)) {
        if (percentage >= 75) {
            response.user = "allow";
        } else {
            response.success = false;
            response.user = "not-allow";   
        }
    } else {
        response.success = false;
        response.inputType = "Bad Request";
    }
    return response;
} 

const checkAllFileds = (student) => {
    let response = {success : true,field : ""};
    for (const key in student) {
        if(student[key] == "") {
            response.success = false;
            response.field = key;
            break;
        }
    }
    return response;
}

server.listen(PORT, () => {
    console.log(`Server is started on PORT : ${PORT}`);
})