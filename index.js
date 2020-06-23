const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("hello");
});


var port=process.env.PORT||5500;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});