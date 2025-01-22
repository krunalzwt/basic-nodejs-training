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
    console.log(q);
    switch (req.url.split("?")[0]) {
      case "/":
        res.end("This is the home page!!");
        break;

      // List all files in the directory
      case "/list":
        fs.readdir(dir, (err, files) => {
          if (err) {
            res.end("Error reading directory");
            return;
          }
          files.forEach((item) => {
            res.write(item + "\n");
          });
          res.end();
        });
        break;

      // Read specific file
      case "/file":
        let filepath = path.join(__dirname, "files", q.query.name);
        console.log(filepath);
        fs.readFile(filepath, "utf8", (err, data) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end("Error reading the file");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write(data);
          res.end();
        });
        break;

      //create a file
      case "/create":
        let filepath1 = path.join(__dirname, "files", q.query.name);
        let content = q.query.content;
        // console.log(filepath1);
        fs.writeFile(filepath1, content, (err, filecontent) => {
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
        break;

      // append into existing file

      case "/append":
        let filepath2 = path.join(__dirname, "files", q.query.name);
        let content2 = q.query.content;
        fs.appendFile(filepath2, content2, (err) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end("Error reading the file");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write(`data updataed!:${content2}`);
          res.end();
        });
        break;

      //delete file

      case "/delete":
        let filepath3 = path.join(__dirname, "files", q.query.name);
        console.log(filepath3);
        fs.unlink(filepath3,(err) => {
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
        break;

      // default

      default:
        res.statusCode = 404;
        res.end("404 Server Error!!");
        break;
    }
  })
  .listen(8000, () => {
    console.log("Server started on port 8000");
  });
