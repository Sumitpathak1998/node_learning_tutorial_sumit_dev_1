import readline from "readline";

// Process for take user input 
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

/**
 * Requirement 
 * 1) Show the todo menu
 * 2) Store the todo task in somewhere
 */

const todo = [];

const showMenu = () => {
    console.log("1.Add the task.");
    console.log("2.View Task");
    console.log("3.Exit");
    rl.question("Choose an option : ", handleInput);
}

const handleInput = (option) => {
    option = Number(option);
    if( option === 1) {
        rl.question("Enter the Task : ", (task) => {
            todo.push(task);
            console.log(`Task added : ${task}`);
            showMenu();
        });
    } else if (option === 2) {
        console.log("Your Todo List");
        todo.forEach((param,index) => {
            console.log(`${index+1}. ${param}`);
        });
        showMenu();
    } else if(option === 3) {
        console.log("App Shut Down"); 
        rl.close();
    } else {
        console.log("Please enter the write choice");
        showMenu();
    }
}

showMenu();
