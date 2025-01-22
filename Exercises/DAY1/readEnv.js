
const dotenv = require("dotenv").config({ path: "../DAY-1/touch.env" });
const name = process.env.APP_NAME;
const env = process.env.APP_ENV;
const port = process.env.APP_PORT;
const debug = process.env.DEBUG;
console.log(name);
console.log(env);
console.log(port);
console.log(debug);
