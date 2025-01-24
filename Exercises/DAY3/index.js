const express = require("express");
const dotenv = require("dotenv").config({ path: "../../.env" });
const fs = require("fs");  
const app = express();
const { users } = require("./constant");
const port = process.env.DAY3_PORT;
const path=require('path');

app.use(express.json());  

const logMiddleware = (req,res,next) =>{
  const { method , url}=req;
  const timestamp = new Date();
  const filepath=path.join(__dirname,"logs.txt");
  const format=`Method:${method}\nTimestamp:${timestamp}\nMessage:${JSON.stringify(req.body)}\n`;
  fs.appendFile(filepath,`${format}\n`,err=>{
    if(err){
      console.log(err);
    }
    else{
      next();
    }
  })
}
app.use(logMiddleware);

const idValidation = (req,res,next)=>{
    const id=parseInt(req.params.id);
    const user = users.find((u) => u.id === id);
    if(!users.includes(user)){
      return res.status(400).send("user does not exists");
    }else{
      next();
    }
};

app.get("/", (req, res) => {
  res.send("Welcome to the user Management API!");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id",idValidation, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  // const updatedContent = `let users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = { users };`;
  
  if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  });
  
  app.post("/users", (req, res) => {
    const { id, name, email, age, role, isActive } = req.body;
    const newUser = { id, name, email, age, role, isActive };
    // const userExists = users.some(user => user.id === newUser.id);
    if(userExists){
      return res.send("id already exists!!");
    }else{
      users.push(newUser);
        if (err) {
          return res.status(500).send("Error updating user data");
        }
        res.status(201).send(newUser);
    }
});

app.patch("/users/:id",idValidation,(req,res)=>{
  const { name, email, age, role, isActive } =req.body;
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  Object.assign(user,{ name, email, age, role, isActive })
  res.json(user);
})

app.delete("/users/:id",idValidation,(req,res)=>{
  const userId=parseInt(req.params.id);
  const userIndex = users.findIndex((u)=>u.id===userId);

  users.splice(userIndex,1);
  res.status(200).send("successfully deleted!!");
  

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
