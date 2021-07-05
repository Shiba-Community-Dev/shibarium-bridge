// Required  Modules:

// File System:
const fs= require('fs');

// Setup Folders
exports.setupFolders = [ 'bin\\shibarium', 'bin\\shibarium/geth', 'bin\\shibarium\\keystore', 'bin\\shibarium\\geth\\chaindata', 'bin\\shibarium\\geth\\lightchaindata'];


// Check for existence of Folders params: array => (folders)
 exports.folderExist = function(folders) {
    
    let found = 0;

    for(var i = 0; i < folders.length; i++){
        if (fs.existsSync(folders[i])){found++; }
     }
    return found; 
}

//  Sleep Function
exports.sleep = function(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}