let cal = (a,b) => a+b;

console.log(`sum of two number : ${cal(2,7)}`);


let fs = require('fs');
let os = require('os');

let user = os.userInfo();
console.log(user.username);

fs.appendFile('greet.txt', `Hi ,Good Evening ${user.username}` , () => {console.log('Greet is over');})

// const prompt = require('prompt-sync')();

// let a = prompt('Enter the first number');
// a = Number(a);
// let b = prompt("Enter the second number");
// b = Number (b);
// let c = a+b;
// console.log(`Sum of two number : ${c}`);
