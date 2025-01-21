const { resolve } = require("path");

function fetchData(success) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (success) {
        res("data fetched successfully!!");
      } else {
        rej("error!!");
      }
    }, 2000);
  });
}

fetchData(true)
    .then((msg) => {
        console.log(msg);
    })
    .catch((err)=>{
        console.log(err);
    });
