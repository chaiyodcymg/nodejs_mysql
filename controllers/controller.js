const { v4: uuidv4 } = require('uuid');
const validator = require("email-validator");


const path = require('path');
const fs = require('fs');
const randomstring = require("randomstring");
const sharp = require('sharp');
const md5 = require('md5')
const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'nodejs_mysql',
    port:3306
})
connection.connect((err)=>{
    if(err){
        console.log("Err connecting to Mysql =",err)
        return;
    }
    console.log("Connecting succesfully!")
})





exports.login = (req,res)=>{

    try {
  
    
       
        // await   dbo.collection("users").find(query).toArray( function(err, result) {
        //     if (err)  throw err;

                
        //             if(result.length > 0 ){
                        
                        
        //                 res.status(200).send({status:true,text:"เข้าสู่ระบบ!",session:result[0]._id,email: result[0].email,name:result[0].name,imageUrl:result[0].imageUrl,admin:result[0].admin})
        //             }else{
                                    
                        
        //                 res.status(200).send({status:false ,  text:"การเข้าสู่ระบบไม่ถูกต้อง - ไม่สามารถตรวจสอบที่อยู่อีเมล และ/หรือ รหัสผ่านของคุณได้ โปรดตรวจสอบและลองอีกครั้ง",session:"" ,email:"",name:"",imageUrl:"",admin:0})
        //             }
                    
        //         db.close();
            
        //     });
                       
       
    } catch (error) {
        res.status(200).send({status:false ,  text:"การเข้าสู่ระบบไม่ถูกต้อง - ไม่สามารถตรวจสอบที่อยู่อีเมล และ/หรือ รหัสผ่านของคุณได้ โปรดตรวจสอบและลองอีกครั้ง",session:"" ,email:"",name:"",imageUrl:"",admin:0})
    }
   
   
}
exports.register = (req,res)=>{
    try {
        if(validator.validate(req.body.email)){
        console.log(req.body)
            connection.query("INSERT INTO users( name , email , password , admin , imageurl) VALUES ( ? , ? , ? , ? , ? )"
            ,[req.body.name , req.body.email, md5(md5(req.body.password)) , 3 , "https://ui-avatars.com/api/?background=cef2ef&color=3aa49a&name="+encodeURIComponent(req.body.name)],
            (err,results,fields) =>{
                if(err){
                    console.log(err)
                    if(err.errno == 1062){
                        return   res.status(400).send({status:false,text:"บัญชีนี้ถูกใช้งานไปแล้ว",session:"",email:"" ,name:"",imageUrl:"",admin:0})
                    }else if(err.errno == 1406){
                        res.status(400).send({status:false,text:"ข้อมูลมากยาวเกินกว่าที่กำหนด",session:"",email:"" ,name:"",imageUrl:"",admin:0})
                    }
                        // return   res.status(400).send({status:false,text:"สมัครสมาชิกไม่สำเร็จ",session:"",email:"" ,name:"",imageUrl:"",admin:0})
                }
                console.log(results)
                console.log("===========================")
                console.log(fields)
                // return  res.status(201).send({status:true,text:"ลงทะเบียนสำเร็จ",session:result2.insertedId,email: req.body.email,name:req.body.name,imageUrl:myobj.imageUrl,admin:myobj.admin})
            })

        }else{
            
            res.status(400).send({status:false,text:"คุณไม่ได้ให้ข้อมูลที่สมบูรณ์ กรุณาใส่อีเมล์ที่ถูกต้อง.",session:"",email:"" ,name:"",imageUrl:"",admin:0})
        }
        // MongoClient.connect(url, async function(err, db) {
        //     if (err) throw err;
    
        //     var dbo = db.db("mydb");
         
        //     if(validator.validate(req.body.email)){
    
            
        //         var query = { email: req.body.email};
        //         await   dbo.collection("users").find(query).toArray(async function(err, result) {
                    
        //                     if (err)  throw err;
                        
        //                     if(result.length > 0 ){
                                                         
        //                         res.status(200).send({status:false ,  text:"This account has already been used.",session:"",email:"" ,name:"",imageUrl:"",admin:0})
    
        //                     }else if(result.length == 0){
    
        //                         var dbo = db.db("mydb");
        //                         var myobj = { _id:uuidv4(),
        //                              name: req.body.name ,
        //                              email: req.body.email,
        //                              password:md5(md5(req.body.password)),
        //                              admin:3,
        //                              imageUrl:"https://ui-avatars.com/api/?background=cef2ef&color=3aa49a&name="+encodeURIComponent(req.body.name)
        //                             };
        //                             await  dbo.collection("users").insertOne(myobj, function(err, result2) {
                                    
        //                             if (err) throw err;
        //                             // console.log(result2);
                                    
        //                                 res.status(200).send({status:true,text:"ลงทะเบียนสำเร็จ",session:result2.insertedId,email: req.body.email,name:req.body.name,imageUrl:myobj.imageUrl,admin:myobj.admin})
                                        
        //                         });
                                
        //                         // console.log({status:false ,  text:"Invalid Login - Your email address and/or password could not be validated. Please check them and try again.",session:""})
                                
        //                     }
                            
        //             db.close();
                    
        //             });
        //     }else{
                    
        //             res.status(200).send({status:false,text:"คุณไม่ได้ให้ข้อมูลที่สมบูรณ์ กรุณาใส่อีเมล์ที่ถูกต้อง.",session:"",email:"" ,name:"",imageUrl:"",admin:0})
        //     }
              
    
         
    
        
            
        // })
    
    } catch (error) {
        console.log(error)
        return   res.status(500).send({status:false,text:"สมัครสมาชิกไม่สำเร็จ",session:"",email:"" ,name:"",imageUrl:"",admin:0})
    }
  
}
// exports.checkin  = (req,res)=>{
//     try {
//         MongoClient.connect(url, async function(err, db) {
//             if (err) throw err;   
//             var dbo = db.db("mydb");
           
//                 var myobj1 = {_id:req.body.id}
//                 await   dbo.collection("users").find(myobj1).toArray(async function(err, result) {
//                     if(result.length > 0){
//                         const date_now = new Date(Date.now())
//                         const date = date_now.toLocaleDateString('th-TH', {timeZone:"Asia/Bangkok",year: 'numeric',month: "short",day: 'numeric'})
//                         const time = date_now.toLocaleTimeString('th-TH',{timeZone:"Asia/Bangkok",hour:"numeric",minute:"numeric"})
                      
//                         var myobj1 = {date:date}
//                    await   dbo.collection("time_checkin").find(myobj1).toArray(async function(err, result) {
//                             if (err) throw err;
            
//                           let status = false
//                             let json = {users:[{id:req.body.id, name:req.body.name, time:time}]}
//                             if(result.length > 0){
                       
//                                    for (let value in result[0].users ) {
//                                     // console.log(result[0].users[value])
//                                         if(result[0].users[value].id == req.body.id){
                                           
//                                             status = false
//                                             break
//                                         }else{
//                                             status = true
//                                             json.users.push(result[0].users[value])
                                        
                                            
//                                         }
                                
//                                     }
//                                     if(status){
                                      
//                                         var myquery = {date:date}
//                                         var newvalues = { $set: json  };
//                                     await  dbo.collection("time_checkin").updateOne(myquery, newvalues, function(err, result) {
//                                         if (err) throw err;
//                                         res.status(200).send({status:true,text:"เช็คอินเข้าทำงานสำเร็จ!"})
//                                         db.close(); 
//                                         });
            
                                    
//                                     }else{
//                                         res.status(200).send({status:false,text:"วันนี้คุณได้เช็คอินเข้าทำงานแล้ว ไม่สามารถเช็คอินซํ้าได้"})
//                                     }
//                             }
//                               else{
                                
                                
//                                 var myobj2 = { _id:uuidv4(), date:date , users:[{id:req.body.id, name:req.body.name , time:time}] };
//                             await    dbo.collection("time_checkin").insertOne(myobj2, function(err, result2) {
//                                     if (err) throw err;
//                                     console.log(result2)
//                                     res.status(200).send({status:true,text:"เช็คอินเข้าทำงานสำเร็จ!"})
//                                     db.close();
//                                 })
//                             }
                         
                            
//                         })
                       
//                     }else{
//                         res.status(200).send({status:false,text:"เช็คอินไม่สำเร็จ"})
                       
//                     }
//                 })
                             
//         })  
//     } catch (error) {
//         res.status(200).send({status:false,text:"เช็คอินไม่สำเร็จ"})
//     }
   

// }

// exports.list_users_checkin = (req,res)=>{
//     try {
//         MongoClient.connect(url, async function(err, db) {
       
     
//             var dbo = db.db("mydb");
//                var myobj1 = {_id:req.body.id}
//                await   dbo.collection("users").find(myobj1).toArray(async function(err, result) {
//                    if(result.length > 0){
//                        dbo.collection("time_checkin").find().toArray(function(err, result) {
//                            if (err) throw err;
//                            // console.log(result);
//                            let json = { date_day:[]}
//                            if(result.length > 0 ){
//                              result = result.reverse()
//                              result.forEach(re => {
                                 
//                                  json.date_day.push(re)
//                              })
//                            //   console.log(json)   
//                                  // json.date_day.push(re)
                             
                         
//                              res.status(200).send( json)
                            
//                            }else{
//                              let json2 = { date_day:[{date: "", users:[{name: "", time: ""}]}]}
//                              res.status(200).send( json2)
                            
//                            }
                         
//                            db.close();
//                          });
//                    }else{
//                        let json2 = { date_day:[{date: "", users:[{name: "", time: ""}]}]}
//                         res.status(200).send( json2)
                      
//                    }
           
              
//            })
     
//    })     
//     } catch (error) {
//         let json2 = { date_day:[{date: "", users:[{name: "", time: ""}]}]}
//         res.status(200).send( json2)
//     }
   
// }
// exports.check_x_api_key = (req)=>{
// try {
//     if( req.headers['x-api-key'] == "813c33ee-d292-4060-884e-ec2897401990asd99sd"){
//         return true
//    }else{
//         return false
//    }
// } catch (error) {
//     return false 
// }
  
//  }


//  exports.edit_profile = (req,res) => {

//     try {
//         MongoClient.connect(url, async function(err, db) {
//             var dbo = db.db("mydb");
//             // console.log(req.files)
//             console.log(req.body.name)
        
//         //   console.log(req.files)
//           if(req.files != null && req.body.name != undefined){
    
//             let file =  req.files.profilePicture
        
//             let extension = path.extname(file.name)
//               let root_path = 'public/'
//             let full_path = 'profile/'+randomstring.generate(50)+extension;
      
//             if(fs.existsSync(root_path+full_path)){
              
//               full_path = 'profile/'+randomstring.generate(60)+extension;
//             }
      
//          await sharp(file.data)
//               .resize(340, 340)
//               .toFile(root_path+full_path,async (err, info) => { 
             
//                   if(err == null){
                              
//                       let url_path = full_path
//                       var myquery = {_id:req.body.id}
//                       var newvalues = { $set: {imageUrl:url_path , name:req.body.name} };
//                       await  dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
                      
//                       if(result.acknowledged){
                        
//                           res.status(200).send({status:true,text:"บันทึกสำเร็จ"})
//                       }else{
//                           res.status(200).send({status:false,text:"บันทึกไม่สำเร็จ"})
//                       }
             
//                           db.close(); 
//                       })
//                   }else{
//                       res.status(200).send({status:false,text:"บันทึกไม่สำเร็จ"})
//                   }
//                   // console.log(err)
              
//               });
    
//           }else if(req.files != null  && req.body.name == undefined){
    
//             let file =  req.files.profilePicture
        
//             let extension = path.extname(file.name)
//               let root_path = 'public/'
//             let full_path = 'profile/'+randomstring.generate(50)+extension;
      
//             if(fs.existsSync(root_path+full_path)){
              
//               full_path = 'profile/'+randomstring.generate(60)+extension;
//             }
      
//          await sharp(file.data)
//               .resize(340, 340)
//               .toFile(root_path+full_path,async (err, info) => { 
             
//                   if(err == null){
                              
//                       let url_path = full_path
//                       var myquery = {_id:req.body.id}
//                       var newvalues = { $set: {imageUrl:url_path } };
//                       await  dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
                      
//                       if(result.acknowledged){
                        
//                           res.status(200).send({status:true,text:"บันทึกสำเร็จ"})
//                       }else{
//                           res.status(200).send({status:false,text:"บันทึกไม่สำเร็จ"})
//                       }
             
//                           db.close(); 
//                       })
//                   }else{
//                       res.status(200).send({status:false,text:"บันทึกไม่สำเร็จ"})
//                   }
//                   // console.log(err)
              
//               });
//           }else{
    
                
                              
    
//             var myquery = {_id:req.body.id}
//             var newvalues = { $set: { name:req.body.name} };
//             await  dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
            
//             if(result.acknowledged){
            
//                 res.status(200).send({status:true,text:"บันทึกสำเร็จ"})
//             }else{
//                 res.status(200).send({status:false,text:"บันทึกไม่สำเร็จ"})
//             }
    
//                 db.close(); 
//             })
                  
//                   // console.log(err)
              
             
//           }
    
    
    
    
//         })
//     } catch (error) {
//         res.status(200).send({status:false,text:"บันทึกไม่สำเร็จ"})
//     }
   
//  }

//  exports.personal_data = (req,res) => {

//      try {
//         MongoClient.connect(url, async function(err, db) {
//             var dbo = db.db("mydb");
//             var query = { _id: req.body.id}  ;
//             await  dbo.collection("users").find(query).toArray( function(err, result) {
//                    if (err)  throw err;
       
                      
//                            if(result.length > 0 ){
                              
//                                // req.session.user = 
//                                // ,session_id:result._id.toString()
//                             //    console.log(result)
//                             //    res.status(200).send({status:true,text:"sadasdsadsagkmli",session:result[0]._id,email: req.body.email})
//                                res.status(200).send({status:true,text:"dsdas",session:result[0]._id,email: result[0].email,name:result[0].name,imageUrl:result[0].imageUrl,admin:result[0].admin})
//                            }else{
                                        
//                                // console.log({status:false ,  text:"Invalid Login - Your email address and/or password could not be validated. Please check them and try again.",session:""})
//                                res.status(200).send({status:false ,  text:"",session:"" ,email:"",name:"",imageUrl:"",admin:0})
//                            }
                           
//                     db.close();
                  
//                  });
    
    
//         }) 
//      } catch (error) {
//         res.status(200).send({status:false ,  text:"",session:"" ,email:"",name:"",imageUrl:"",admin:0})
//      }

  

//  }
