const EventEmitter = require("events");
const { emit } = require("process");
// create the instance of EventEmitter
const emitter = new EventEmitter();

//! Objective
/* Create a program using Node.js EventEmitter that:

//? Listens for multiple types of user events (e.g., login, logout, purchase, and profile update).
//? Tracks how many times each event is emitted.
//? Logs a summary of all event occurrences when a special summary event is triggered.

*/

//! Requirements
//? Create at least four custom events (e.g., user-login, user-logout, user-purchase, profile-update).
//? Emit these events multiple times with different arguments (e.g., username, item purchased).
//? Track and store the count of each event type.
//? Define a summary event that logs a detailed report of how many times each event was triggered.

// let summaryObj = {
//     "user-login" : 0,
//     "user-logout" : 0,
//     "user-purchase" : 0,
//     "profile-update" : 0 
// };

// emitter.on("user-login", () => ++summaryObj['user-login']);
// emitter.on("user-purchase", () => ++summaryObj['user-purchase']);
// emitter.on("profile-update", () => ++summaryObj['profile-update']);
// emitter.on("user-logout", () => ++summaryObj['user-logout']);

// emitter.on("summary", (args) => {
//     for (const key in args) {
//         console.log(`${key} execute ${args[key]} number of time`);
//     }
// })

// More advance that number of time we execute this script it increse the count

global["user-login"] = 0;
global["user-logout"] = 0;
global["user-purchase"] = 0;
global["profile-update"] = 0;

emitter.on("user-login", () => ++global['user-login']);
emitter.on("user-purchase", () => ++global['user-purchase']);
emitter.on("profile-update", () => ++global['profile-update']);
emitter.on("user-logout", () => ++global['user-logout']);

emitter.on("summary", (args) => {
    args.forEach((parma) => {console.log(`${parma} execute : ${global[parma]} times`)})
})


emitter.emit("user-login", "Sumit");
emitter.emit("user-purchase", "Shirt");
emitter.emit("profile-update", "email");
emitter.emit("user-logout", "sumit");

emitter.emit("user-login", "Nisha");
emitter.emit("user-purchase", "Shirt");
emitter.emit("user-logout", "Nisha");

emitter.emit("user-login", "Amit");

emitter.emit('summary', ["user-login","user-purchase","profile-update","user-logout"]);