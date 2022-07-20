const express = require('express')
const router = express.Router()
const controller = require("../controllers/controller")
const path = require('path');
const fs = require('fs');
const root_dir = require('../index')



router.use((req, res, next) => {
    
  res.setHeader("Content-Type", "application/json");
    // if(req.headers['x-api-key']!= undefined && controller.check_x_api_key(req)){
        next()
       
    // }else{
    //     res.status(403)
    //     res.send({message:"Forbidden"})  
    // }
  
  
})






router.get("/",(req,res)=>{

//   var img =  fs.readFileSync ("/Users/chaiyot/Desktop/Codes/nodejs-mongodb/public/profile/19zCf7DrHUVx4cSfEh8QwCfTbJ4sb9br29kSZdTnytb78GuVPp.jpg");
 
// sharp(root.root_dir+"profile/hnfnoyNUOmfGQlbEk9s2yrBRAXXwmEtJxZSmz4uQueJsS1tGoH.jpg")
//   .resize(320, 340)
//   .toFile(root.root_dir+'profile/output.jpg', (err, info) => { 
//     console.log(info)
//   });


res.render('index.html', {root: __dirname })

})
router.post("/login", controller.login)
router.post("/register",controller.register)

// router.post("/checkin",controller.checkin)

// router.post("/list-users-checkin",controller.list_users_checkin)

// router.patch("/edit_profile",controller.edit_profile)
// router.post("/personal_data",controller.personal_data)
module.exports = router