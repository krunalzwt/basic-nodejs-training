const fs=require('fs');
const path=require('path');
const dir=path.join(__dirname);

fs.readdir(dir,(err,dir)=>{

    dir.forEach((item)=>{
        console.log(item);
    })

});

