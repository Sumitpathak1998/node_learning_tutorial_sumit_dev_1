const EventEmitter = require("events");

// Create an instane of EventEmitter
const emitter = new EventEmitter(); 
// 1.Define an event listner (addListner)
emitter.on("greet",(username) => {
    console.log(`Hello ${username} from Node Js`);
});
// 2. Trigger (emit) the "greet" event
emitter.emit("greet","Sumit Pathak");
emitter.emit("greet","Amit Kumar Pathak");
