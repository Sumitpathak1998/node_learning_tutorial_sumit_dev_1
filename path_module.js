const path = require('path');

console.log(__filename);
console.log(__dirname);
let filepath = path.join("folder","student","data.txt");
console.log(filepath);

const parseData = path.parse(filepath);
const resolvePath = path.resolve(filepath);
const extname = path.extname(filepath);
const basename = path.basename(filepath);
const dirname = path.dirname(filepath);

console.log(parseData);
console.log("Resolve Path : "+resolvePath);
console.log("extension : "+extname);
console.log("Base Name : "+basename);
console.log("Dir Name : "+dirname);
