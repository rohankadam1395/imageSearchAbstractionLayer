var appRoutes=require('./routes/appRoutes');
const express=require('express');
if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
const app=express();
const axios=require('axios');
const bodyParser=require('body-parser');
app.use(bodyParser.json());

appRoutes(app);

app.get('/api',(req,res)=>{
var search=req.query.search;

    var reqPath=`https://www.googleapis.com/customsearch/v1?key=${process.env.key}&cx=${process.env.cx}&q=${search}&searchType=image&imgType=photo`;
    axios.get(reqPath)
    .then(data=>{
//console.log(data.data.items);
res.send(data.data.items);
    }).catch(err=>{
res.send("Error in fetching images");
    });

   
      
    
});


var port=process.env.PORT||5500;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});