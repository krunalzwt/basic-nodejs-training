const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Define The Duration`, (seconds) => {

  const count=setInterval(()=>{
    if(seconds>0){
      console.log(`Remaining Time : ${seconds}`)
      seconds--;
    }else{
      console.log("Time's up!!");
      clearInterval(count);
    }
  },1000);

  rl.close();
});
