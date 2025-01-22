const fs=require('fs');
const path=require('path');
const dir=path.join(__dirname);

fs.readdir(dir,(err,file)=>{

    try{
        file.forEach((item)=>{
            console.log(item);
        })
    }catch(err){
        console.log(err);
    }
});

