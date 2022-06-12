const express = require('express')
const app =express()
const cors = require('cors')
const MongoClient =require('mongodb').MongoClient
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
const md5 = require('md5');
const url = "mongodb://localhost:27017/mydb";

const session = require('express-session')
// const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid');
const validator = require("email-validator");
let count = 0
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
}))



app.get("/",(req,res)=>{
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydb");
    //     var myquery = { password: "1234"};
    //     var newvalues = { $set: {password: md5("1234") } };
    //     dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document updated");
    //       db.close();
    //     });
    //   });
    const date = new Date(Date.now())

    const result = date.toLocaleDateString('th-TH', {year: 'numeric',month: "short",day: 'numeric',hour:"numeric",minute:"numeric"})
    // const result = date.toLocaleTimeString('th-TH',{hour:"numeric",minute:"numeric"})
    res.send(result)
})

app.post("/login",(req,res)=>{
    // console.log(req.headers)
   
    MongoClient.connect(url,async function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");

        // console.log(req.headers['x-api-key'].toString())
        if(req.headers['x-api-key'] != undefined && req.headers['x-api-key'].toString() == "813c33ee-d292-4060-884e-ec2897401990asd99sd"){

            var query = { _id: req.headers['x-api-key'].toString()};

       
              
                    var query = { email: req.body.email,password:md5(req.body.password)};
                 await   dbo.collection("users").find(query).toArray( function(err, result) {
                        if (err) res.send({err});
            
                           
                                if(result.length > 0 ){
                                    res.status(200);
                                    // req.session.user = 
                                    // ,session_id:result._id.toString()
                                    console.log({status:true,text:"Login Successfully!",session:result[0]._id,email: req.body.email,name:result[0].name})
                                    res.send({status:true,text:"Login Successfully!",session:result[0]._id,email: req.body.email,name:result[0].name})
                                }else{
                                    res.status(200);
                                    
                                    // console.log({status:false ,  text:"Invalid Login - Your email address and/or password could not be validated. Please check them and try again.",session:""})
                                    res.send({status:false ,  text:"Invalid Login - Your email address and/or password could not be validated. Please check them and try again.",session:"" ,email:"",name:""})
                                }
                                
                                        db.close();
                       
                      });
               
          

        }else{
            
            res.status(403)
             res.send({message:"Forbidden"})

        }

    
        
    })
   
})

app.post("/register",(req,res)=>{

    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");

        // console.log(req.headers['x-api-key'].toString())
        if(req.headers['x-api-key'] != undefined && req.headers['x-api-key'].toString() == "813c33ee-d292-4060-884e-ec2897401990asd99sd"){

               if(validator.validate(req.body.email)){

              
                    var query = { email: req.body.email};
                 await   dbo.collection("users").find(query).toArray(async function(err, result) {
                       
                        if (err) res.send({err});
                            
                                if(result.length > 0 ){
                                    res.status(200);                         
                                    res.send({status:false ,  text:"This account has already been used.",session:"",email:"" ,name:""})

                                }else if(result.length == 0){

                                    var dbo = db.db("mydb");
                                    var myobj = { _id:uuidv4(), name: req.body.name ,email: req.body.email,password:md5(req.body.password)};
                                     await  dbo.collection("users").insertOne(myobj, function(err, result2) {
                                       
                                        if (err) throw err;
                                        console.log(result2);
                                            res.status(200);
                                            res.send({status:true,text:"Successful registration.",session:result2.insertedId,email: req.body.email,name:req.body.name})
                                           
                                    });
                                   
                                    // console.log({status:false ,  text:"Invalid Login - Your email address and/or password could not be validated. Please check them and try again.",session:""})
                                   
                                }
                                
                        db.close();
                       
                      });
                    }else{
                        res.status(200); 
                        res.send({status:false,text:"You have not provided complete information. Please enter a valid email address.",session:"",email:"" ,name:""})
                    }
          

        }else{
            
            res.status(403)
             res.send({message:"Forbidden"})

        }

    
        
    })
});
app.post("/checkin",(req,res)=>{

    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
     
        var dbo = db.db("mydb");
        if(req.headers['x-api-key'] != undefined && req.headers['x-api-key'].toString() == "813c33ee-d292-4060-884e-ec2897401990asd99sd"){
            const date_now = new Date(Date.now())
            const date = date_now.toLocaleDateString('th-TH', {year: 'numeric',month: "short",day: 'numeric'})
            const time = date_now.toLocaleTimeString('th-TH',{hour:"numeric",minute:"numeric"})
          
            var myobj1 = {date:date}
       await   dbo.collection("time_checkin").find(myobj1).toArray(async function(err, result) {
                if (err) throw err;

              let status = false
                let json = {users:[{id:req.body.id, name:req.body.name, time:time}]}
                if(result.length > 0){
           
                       for (let value in result[0].users ) {
                        console.log(result[0].users[value])
                            if(result[0].users[value].id == req.body.id){
                               
                                status = false
                                break
                            }else{
                                status = true
                                json.users.push(result[0].users[value])
                            
                                
                            }
                    
                        }
                        if(status){
                          
                            var myquery = {date:date}
                            var newvalues = { $set: json  };
                        await  dbo.collection("time_checkin").updateOne(myquery, newvalues, function(err, result) {
                            if (err) throw err;
                            res.send({status:true,text:"เช็คอินเข้าทำงานสำเร็จ!"})
                            db.close(); 
                            });

                        
                        }else{
                            res.send({status:false,text:"วันนี้คุณได้เช็คอินเข้าทำงานแล้ว ไม่สามารถเช็คอินซํ้าได้"})
                        }
                }
                  else{
                    
                    
                    var myobj2 = { _id:uuidv4(), date:date , users:[{id:req.body.id, name:req.body.name , time:time}] };
                await    dbo.collection("time_checkin").insertOne(myobj2, function(err, result2) {
                        if (err) throw err;
                        console.log(result2)
                        res.send({status:true,text:"เช็คอินเข้าทำงานสำเร็จ!"})
                        db.close();
                    })
                }
             
                
            })
           


          
        }
        
    })

})

app.post("/list-users-checkin",(req,res)=>{

    MongoClient.connect(url, async function(err, db) {
       
        if(req.headers['x-api-key'] != undefined){
                    var dbo = db.db("mydb");
                var myobj1 = {_id:req.headers['x-api-key']}
                await   dbo.collection("users").find(myobj1).toArray(async function(err, result) {
                    // console.log(result)
              
            
                    if(result.length > 0){
                        dbo.collection("time_checkin").find().toArray(function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            let json = { date_day:[]}
                            if(result.length > 0 ){
                              result = result.reverse()
                              result.forEach(re => {
                                  
                                  json.date_day.push(re)
                              })
                              console.log(json)   
                                  // json.date_day.push(re)
                              
                          
                              res.status(200)
                              res.send( json)
                            }else{
                              let json2 = { date_day:[{date: "", users:[{name: "", time: ""}]}]}
                              res.status(200)
                              res.send( json2)
                            }
                          
                            db.close();
                          });
                    }else{
                        res.status(403)
                        res.send({message:"Forbidden"})
                    }
            
               
            })
        }else{
            res.status(403)
            res.send({message:"Forbidden"})
        }
    })
    // res.send( json)
// console.log(req.body.timestamp)

})
app.listen(PORT,()=>{
    console.log("Server running on Port http://localhost:"+PORT)
})