
//  Required  Modules
const express = require('express')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {orgin: "*"}})
const open = require('open');
const env = require('dotenv').config()


//  Events
const Broadcaster = require('events');
const broadcaster = new Broadcaster();

// Import Additional Required functions

const {folderExist, setupFolders,sleep } = require("./setup/setup");
const {start_geth, init_geth, showProcess} = require("./geth");
const { response } = require('express');


//  Server Port Settings
const port =  process.env.PORT || 9000;

//App config
let setupflag = 0;


//  Server Routes
app.use("/bridge", express.static(__dirname + "/bridge"));
app.use("/setup", express.static(__dirname + "/setup"));
app.use("/@metamask", express.static(__dirname + "/node_modules/@metamask"));
app.use("/bowser", express.static(__dirname + "/node_modules/bowser"));



app.get('/', function(req, res){
    res.redirect('/bridge');
    
});

app.get('/setup', function(req, res){

        res.render('index');
});

app.get('/bridge', function(req, res){   
    res.render('index');   
});


// Check for existence of app operational folders
let foldersFound = folderExist(setupFolders);


//run http server
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  });


  if (foldersFound == setupFolders.length) {
    open('http://localhost:9000/bridge');
  } else {
    open('http://localhost:9000/setup');  
        
  }

console.log(setupflag + " => " + foldersFound);

function check_setup() {
    
    broadcaster.emit("forHtml", "Start Check Up.....",0);

    
    sleep(2000);
    // If the setup folders were found: => Start Geth
    if (foldersFound == setupFolders.length && setupflag == 0) {    
        sleep(2000)
        broadcaster.emit("forHtml", "Geth Folders Initialized : pass",1); 
        broadcaster.emit("forHtml","Attempting to start geth node...",2)
        sleep(2000)
        //Check if thier is current running Geth process 
         let isrunning = new Promise((resolve, reject)=> {
            let x = showProcess("geth");
            
            if (x) { resolve("true")}
            if (!x){ reject("false")}
        })
        
        isrunning.then(
            function(value){
                if (value == "true") {
                    console.log("Check up determined: Geth is currently running.")}
                }, function(error) {
                    console.log("Check up Determined: There are no running geth processes "); 
                    sleep(2000);
                    if (setupflag == 0){ startNow();}  
                })
    }else{
       
        setupflag = 1;
        sleep(5000)
        broadcaster.emit("forHtml","<error missing config folders=> found " + foldersFound + " folders but " + setupFolders.length + " folders Exist",0)
        sleep(2000)
        broadcaster.emit("forHtml","Will now attempt to initalize geth.... please wait....",0)
        sleep(2000)
        console.log("Test 3: " +setupflag)          //test
        let did_init =new Promise((resolve, reject)=> {
            let o = init_geth();
            console.log("Test 1: " +o)      //test
            if (o) { resolve("true")}
            if (!o){ reject("false")}
        }) 
        
        did_init.then(
            function(value){
                console.log("Test 2: " +value)      //test
                if (value === "true") {
                    
                    if (setupflag == 1) {
                        setupflag = 0;
                        console.log("Test 4: " +setupflag)          //test
                        broadcaster.emit("forHtml", "Success!:  initalization suceeded!!",0);
                        sleep(2000);
                        broadcaster.emit("forHtml", " Select Button Above to Proceed to Bridge",1);

                    } 
                }
            }, function(error) {
                    console.log("Check up Determined: Intializing geth failed.. " + error); 
                    sleep(2000);
                    broadcaster.emit("forHtml", "Initalization Failed...",0)
        })
       
                
    }
}

function startNow() {
    let did_start = start_geth();
    sleep(5000);
        if (did_start) {
            showProcess("geth"); 
            sleep(2000);
            broadcaster.emit("forHtml", "Success!!.. Geth is currently running",3);
            sleep(2000);
            broadcaster.emit("forHtml", " ",4);
            sleep(2000);
            broadcaster.emit("forHtml", " ",5);
 
        }
}

process.on('exit', async () => {});


 io.on("connection", (socket) => {
    
    console.log("There is a client connected with id:" + socket.id)

    socket.on("run", (method) => {      //  recieve {method} requested from {run} event emited by client 
        if (method == "check") {
            check_setup();
        }
    })

    //  Register Listener for broadcaster responses
    broadcaster.on("forHtml", function (responseData,casevalue) {
        console.log(responseData);
        socket.emit("console", responseData,casevalue);
    })
  });