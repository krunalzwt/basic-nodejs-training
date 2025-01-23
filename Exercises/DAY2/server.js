const http = require("http");
const path = require("path");
const fs = require("fs");
const dir = path.join(__dirname, "files");
const readline = require("readline");
let url = require("url");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const myServer = http
  .createServer((req, res) => {
    // Parse query string
    const q = url.parse(req.url, true);
    let filepath = path.join(__dirname, "files", q?.query?.name ?? "");
    let content = q.query.content;
    let filename = q.query.name;
    console.log(filename);

    switch (req.url.split("?")[0]) {
      //root
      case "/":
        res.end("This is the home page!!");
        break;

      // List all files in the directory
      case "/list":
        fs.readdir(dir, (err, files) => {
          if (err) {
            res.end("Error reading directory");
            return;
          } else {
            files.forEach((item) => {
              if (path.extname(item) == ".txt") {
                res.write(item + "\n");
              }
            });
          }
          res.end();
        });
        break;

      // Read specific file
      case "/file":
        if (path.extname(filepath) !== ".txt") {
          res.end("please enter .txt files");
        } else if (!fs.existsSync(filepath)) {
          res.end("file does not exists!");
        } else {
          fs.readFile(filepath, "utf8", (err, data) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.end("Error reading the file");
              return;
            } else {
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.write(data);
              res.end();
            }
          });
        }

        break;

      //create a file
      case "/create":
        if (fs.existsSync(filepath)) {
          res.end("file already exists!!");
        } else if (path.extname(filepath) !== ".txt") {
          res.end("file needs to be .txt format!!");
          return;
        } else {
          fs.writeFile(filepath, content, (err, filecontent) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.end("Error reading the file");
              return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(`file created and data updataed!:${content}`);
            res.end();
          });
        }
        break;

      // append into existing file

      case "/append":
        if (!fs.existsSync(filepath)) {
          res.end("file does not exists!!");
        } else if (path.extname(filepath) !== ".txt") {
          res.end("file needs to be .txt format!!");
          return;
        }else{
          fs.appendFile(filepath, content, (err) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.end("Error writing the file");
              return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(`data updataed!:${content}`);
            res.end();
          });
        }
        break;

      //delete file

      case "/delete":

        if(!fs.existsSync(filepath)){
          res.end("file does not exists!!");
        }else{
          fs.unlink(filepath, (err) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.end("Error deleting the file");
              return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("successfully deleted!!");
            res.end();
          });
        }

        break;

      // default

      default:
        res.statusCode = 404;
        res.end("404 Server Error!!");
        break;
    }
  })
  .listen(8000, () => {
    console.log("Server started on http://localhost:8000");
  });
