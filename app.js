
const http = require('http');
const fs = require('fs');
var express = require('express')
const app = express();
const { exec } = require('child_process');
const find = require('find-process');
const open = require('open');
//Server Port Settings
const port = 9000;


const intit= initCheck();

//Check if initalized and Setup
if (intit == 0) { 
    //Initalize node 
    initGeth();
}else{
    //Starup Node
    if (startGeth()){
        showProcess();
        startHttp();
        startHttpExplorer();
    }
    open('http://localhost:9000');
}


//Start web server
function startHttp() {

  app.use(express.static('html')); 
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
});

  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })

}


function startHttpExplorer() {

    exec('npm --prefix block_explorer/ run start"', {},(error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
}


//Setup and config functions
 function initGeth()  {
    console.log("<info: Initalizing Chain...")

    var dir="bin/shibarium/geth";
   
    fs.rm(dir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
        console.log(`<info: ${dir} is cleaned!`);
    });

    exec('bin\\geth.exe --datadir="bin\\shibarium" init "bin\\shibgenesis.json"', {},(error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      });
}

 function startGeth() {
    
     exec('geth.exe --datadir="bin\\shibarium" --networkid 20210 --http --http.port 8545 --http.api "eth,net,web3, personal" --http.corsdomain "*" --bootnodes "enr:-J24QC5A7oB1syQdXddcwkgkZiRz571KHWxK-Q7hnWzbEtvQRtsZPb9nhrqPrnOFolSNeoYDL60-ir-dPFY-vDycKogCg2V0aMfGhC6e4G6AgmlkgnY0gmlwhI_GP7WJc2VjcDI1NmsxoQJyQQNS9_tLwqoMGnDQx6Rj_eovJU290FuhhgtRBQv2cYRzbmFwwIN0Y3CCndODdWRwgp3T"', (error, stdout, stderr) => {
        if (error) {
            console.log(`<error: ${error.message}`)
            return false
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return false
        }
            console.log(`stdout: ${stdout}`) 
    });
    return true; 
}

//##Check for Dependecies
function initCheck() {

    //##Check if data directory exist
    if (fs.existsSync('bin/shibarium')) {
        console.log('<info: data directory is present.')
        } else{
            //## If folder don't exist the create it  (* no need if npm installs correctly)
            
        }
    
    fs.access("bin/geth.exe", fs.F_OK, (err) => {
    if (err) {
      console.log("<err: All required files (geth.exe) is not present\n Please Download")
      return;
    }  
    console.log("<info: All required files (geth.exe) is present")
    
    if (fs.existsSync('bin/shibarium/geth') && fs.existsSync('bin/shibarium/keystore')) {

        console.log('<info: The Chain is Initalized.')
        return 1;
        }
        else
        { 
        console.log("<err: The Chain is not Initalized")
        console.log("<info: Starting Initalization Process") 
        return 0;
        } 
  })
  
}

function showProcess() {

    find('name', 'geth', true).then(function (list) {
    console.log('there is a geth process runnning with the pid of: %s  ', list[0].pid);
    
  });
            
}




