const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("What is the event? : ", (event) => {
  function time() {
    rl.question("Enter the time in seconds: ", (seconds) => {
      const min_int = 0;
      let input = Number(seconds);
      if (!isNaN(input) && input >= min_int) {
        let reminder = setTimeout(() => {
          console.log(`${event}`);
        }, input * 1000);
        rl.close();  
      } else {
        console.log(
          "Invalid Input!Enter Again"
        );
        time();  
      }
    });
  }
  time();  
});
