var appRoutes=require('./routes/appRoutes');
const express=require('express');
const bodyParser=require('body-parser');
if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
const app=express();
app.use(bodyParser.json());

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
const path=require('path');
app.get('/',(req,res)=>{
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})
}
appRoutes(app);








var port=process.env.PORT||5500;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});