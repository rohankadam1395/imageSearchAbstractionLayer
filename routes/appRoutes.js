
const mongoose=require('mongoose');

module.exports=function(app){
    mongoose.connect(process.env.DB,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
        if(err){
            console.log(err);
        }
        console.log("Successfully connected to database");

        app.get('/data',(req,res)=>{
            res.send(["Search1","Search2","Search3"]);
                }); 

        });


   
}