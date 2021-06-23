

let currentAccount = null;
ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });




// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
    }
  }

function connect() {
 // document.getElementById("connectButton").disabled = 'true';
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }

  function addNetwork(){

    networkButton.onclick = async () => {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '20210',
          rpcUrls: ['http://localhost:8545'],
          chainName: 'Shibarium',
          nativeCurrency: { name: 'STEAK', decimals: 18, symbol: 'STK' },
          blockExplorerUrls: ['https://shibarium.dev/explorer'],
        }],
      })
    }



  }
