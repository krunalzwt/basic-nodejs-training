const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fs = require("fs");
try {
  rl.question(`enter the input for the file 'a.txt':`, (input) => {
    fs.writeFileSync("a.txt", `${input}`); //creating the file and adding the text
    console.log("file written successfully!!");
    rl.close();
  });
} catch (err) {
  consolr.log(err);
  rl.close();
}

// fs.appendFileSync('a.txt','hello world !!');        //add new text in the file
// fs.writeFileSync('a.txt','wifbhdvsdfgwrbj ');       //overwrite the existing file
// fs.writeFileSync('b.txt','');                           //creating an empty file
// fs.unlinkSync('b.txt');                                //deleting a file
