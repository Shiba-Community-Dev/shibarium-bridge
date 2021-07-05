
// Required Modules
const path = require('path');
const { exec } = require('child_process');
const find = require('find-process');



// Start Geth Node with Params

 function start_geth() {

    var gethArgs = 'bin\\geth.exe --datadir="bin\\shibarium" --networkid 20210 --http --http.port 8545 --http.api "eth,net,web3, personal" --http.corsdomain "*" --bootnodes "enr:-J24QC5A7oB1syQdXddcwkgkZiRz571KHWxK-Q7hnWzbEtvQRtsZPb9nhrqPrnOFolSNeoYDL60-ir-dPFY-vDycKogCg2V0aMfGhC6e4G6AgmlkgnY0gmlwhI_GP7WJc2VjcDI1NmsxoQJyQQNS9_tLwqoMGnDQx6Rj_eovJU290FuhhgtRBQv2cYRzbmFwwIN0Y3CCndODdWRwgp3T"';

    exec(gethArgs, {}, (error, stdout, stderr) => {
        if (error) {
            console.log(`<error: ${error.message}`);
            return false;
        }
        if(stderr){console.log(`<stderr: ${stderr}`);}
        if(stdout){console.log(`<stdout: ${stdout}`); }    
    });
    return true;          
}

   
function init_geth() {

    var gethArgs = 'bin\\geth.exe --datadir="bin\\shibarium" init "bin\\shibgenesis.json"'

    exec(gethArgs, {}, (error, stdout, stderr) => {
        if (error) {
            console.log(`<error: ${error.message}`);
            return false;
        }       
        if(stderr){console.log(`<stderr: ${stderr}`);}
        if(stdout){console.log(`<stdout: ${stdout}`); } 
    });
    
    return true;
}


//  Show The Pid # of A running process set by => process <name>
function showProcess(process) {
    var flag;

    find('name', process, true).then(function (list) {  //This needs to change look at true
        if(!list.length) {
            flag = false;
            console.log("Show Process: No " + process + " processes running => ok to start")
        } else {
            flag = true;
            console.log('Show Process: There is a '+ process +' process runnning with the pid of: ' + list[0].pid)
        }    
       
    }).catch( err => {
        console.log("False Flag" + err)
        flag = false;
    })
    return flag;
}

function stopProcess() { process.kill()}

    module.exports.init_geth = init_geth;
    module.exports.start_geth = start_geth;
    module.exports.showProcess = showProcess;
    module.exports.stopProcess = stopProcess;