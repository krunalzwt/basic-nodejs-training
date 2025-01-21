const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Define The Duration :`, (seconds) => {
    let reminder=setTimeout(()=>{
        console.log("Drink Water Now!!");
    },seconds*1000);
    rl.close();      
})

