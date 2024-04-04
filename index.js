const express = require('express');
const PORT = 8000;

// init app
const app = express();

app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});