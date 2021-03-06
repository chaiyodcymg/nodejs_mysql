const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const session = require('express-session')
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({limit: '25mb'}));
const fileUpload = require('express-fileupload')
app.use(cors())


const router = require('./routes/route')

app.use(express.static(__dirname + '/public'));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
}))
app.use(fileUpload({
    createParentPath: true
}));

exports.root_dir = __dirname+"/public/"

app.use(router)

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { v4: uuidv4 } = require('uuid');
io.on('connection', (socket) => {
  console.log("New connection "+socket.id);
  setTimeout(()=>{
    console.log("emitt");
    socket.emit("event", true);
  }, 2000);


});


  server.listen(PORT, () => {
    console.log("Server running on Port http://localhost:"+PORT)
})