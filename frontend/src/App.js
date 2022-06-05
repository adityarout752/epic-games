import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS,transformCharacterData  } from './constants';
import myEpicNFT from "./utils/MyEpicNFT.json";
import { ethers } from 'ethers';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const [characterNFT, setCharacterNFT] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = Window;
      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log(' accounts:', accounts);
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account found');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const connectWalletAction =async() => {
    try{
      const {ethereum} = window;


      if(!ethereum) {
        alert("Get Metamask!")
        return ;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts',});
      console.log('accounts', accounts);
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);

    }
    catch(error) {
      console.log(error)
    }
  }

  // Render Methods
const renderContent = () => {
  
  //scenerio 1 if not connected
  if(!currentAccount) {
    return (
      <div className="connect-wallet-container">
        <img
          src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
          alt="Monty Python Gif"
        />
        <button
          className="cta-button connect-wallet-button"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
      </div>
    );
  }
  //scenerio  wallet connected but no nft 

  if(currentAccount && !characterNFT) {
    return(
      <SelectCharacter setCharacterNft={setCharacterNFT}   />
    )
  }
};

  useEffect(() => {
    const checkNetwork = async () => {
      try { 
        if (window.ethereum.networkVersion !== '4') {
          alert("Please connect to Rinkeby!")
        }
      } catch(error) {
        console.log(error)
      }
    }
    checkIfWalletIsConnected();
  }, [])

  useEffect(() => {
   const fetchNFTMetaData = async() => {
     console.log("Checking for Character NFT on address:",currentAccount)

     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
      const gameContract = new ethers.Contract(CONTRACT_ADDRESS,myEpicNFT.abi,signer);

      const txn = await gameContract.checkIfUserHasNFT();
      if(txn.name) {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('No character NFT found');
      }
   };

   if(currentAccount) {
     console.log("Current Account:",currentAccount);
     fetchNFTMetaData()
   }
  }, [currentAccount])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
            
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
