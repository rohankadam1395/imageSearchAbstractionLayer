
const mongoose=require('mongoose');
const axios=require('axios');

var Schema=mongoose.Schema;

var searchQuerySchema=new Schema({
query:String,
});

var searchQueryModel=mongoose.model('searchQueryModel',searchQuerySchema);
module.exports=function(app){
    mongoose.connect(process.env.DB,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
        if(err){
            console.log(err);
        }
        console.log("Successfully connected to database");
        app.get('/api',(req,res)=>{
            var search=req.query.search;
            
                var reqPath=`https://www.googleapis.com/customsearch/v1?key=${process.env.key}&cx=${process.env.cx}&q=${search}&searchType=image&imgType=photo`;
                axios.get(reqPath)
                .then(data=>{                    
            res.json(data.data.items);
        // res.send("Hello");
                }).catch(err=>{
            res.send("Error in fetching images");
                });
            
               
                  
                
            });
        app.get('/data',(req,res)=>{
            searchQueryModel.find({},null,{sort:{_id:-1},limit:10},(err,docs)=>{
                if(err){
                    console.log(err);
                }
                
                res.json(docs);
              //  res.send("Hello for database");

            })

                }); 

                app.post('/data',(req,res)=>{
                    var doc=new searchQueryModel({query:req.body.searchQuery});
doc.save((err)=>{
    if(err){
        console.log(err);
    }
    console.log("Save Successfully");
    res.send("Post Successfull");

});
                });

        });


   
}