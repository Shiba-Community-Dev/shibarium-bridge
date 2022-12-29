//  Required Imports
import detectEthereumProvider from '/@metamask/detect-provider/dist/index.js';
import MetaMaskOnboarding from '/@metamask/onboarding/dist/metamask-onboarding.es.js';


const port = 9000;
const forwarderOrigin = 'http://localhost:'+ port + "/bridge";


//  MetaMask Provider
const provider = await detectEthereumProvider();

if (provider) {
  console.log("MetaMask is  Installed!");
} else {
  console.log('Please install MetaMask!');
}

//We create a new MetaMask onboarding object to use in our app
const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
}

//Go to settings in MetaMask then Advanced 

const initialize = () => {
  //You will start here
  const onboardButton = document.getElementById('connectButton');
  const addNetworkButton = document.getElementById('AddNetworkButton');

//This will start the onboarding proccess
const onClickInstall = () => {
  onboardButton.innerText = 'Onboarding in progress';
  onboardButton.disabled = true;
  //On this object we have startOnboarding which will start the onboarding process for our end user
  onboarding.startOnboarding();
};

const onClickConnect = async () => {
  try {
    // Will open the MetaMask UI
    // You should disable this button while the request is pending!
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error(error);
  }
};

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      onboardButton.innerText = 'Click here to install MetaMask!';
     
      //When the button is clicked we call this function
      onboardButton.onclick = onClickInstall;
      //The button is now disabled
      onboardButton.disabled = false;

    } else {
      //If it is installed we change our button text
      onboardButton.innerText = 'Connect Wallet';
      addNetworkButton.innerText = 'Add Shibarium';
      //When the button is clicked we call this function to connect the users MetaMask Wallet
      onboardButton.onclick = onClickConnect;
      addNetworkButton.onclick = addShibariumNetwork;
      //The button is now disabled
      onboardButton.disabled = false;
      addNetworkButton.disabled = false;
    }
  };
  MetaMaskClientCheck();

};
window.addEventListener('DOMContentLoaded', initialize);



export const SHIBARIUM_TESTNET_PARAMS = {
  chainId: '0x4ef2',
  chainName: 'Shibarium Testnet Chain',
  nativeCurrency: {
      name: 'STEAK',
      symbol: 'STK',
      decimals: 18
  },
  rpcUrls: ['http://localhost:8545'],
  blockExplorerUrls: ['http://localhost:8000']
};

  async function addShibariumNetwork () {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4ef2' }],
      });
    } catch (Error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (Error === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SHIBARIUM_TESTNET_PARAMS],
          });
        } catch (Error) {
          console.log("There was a problem adding network!")
        }
      }
      // handle other "switch" errors
    }
  };

