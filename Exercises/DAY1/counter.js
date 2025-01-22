const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Define The Duration`, (seconds) => {

  let input = Number(seconds);
  const min_int = 1;

  if (input >= min_int && typeof input === "number") {
    let count=setInterval(()=>{
      if(input>0){
        console.log(`Remaining Time : ${input}`)
        input--;
      }else{
        console.log("Time's up!!");
        clearInterval(count);
      }
    },1000);
  } else {
    console.log("Invalid Input!!");
  }

  rl.close();
});
