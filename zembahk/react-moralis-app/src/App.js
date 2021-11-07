import logo from './logo.svg';
import './App.css';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { contractAbi, CONTRACT_ADDRESS } from "./abi.js";
import React, { useState } from 'react';

//placeholder code
const loadImage = () =>
  fetch("https://js3d87qgmd.execute-api.us-east-1.amazonaws.com/test/helloworld")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => console.log(res));
// loadImage();



function Form() {
  const [tokenAddress, setAddress] = useState(''); 
  const [tokenAmount, setAmount] = useState(''); // '' is the initial state value
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
    console.log(tokenAddress);
    console.log(tokenAmount);
    //SendTx(tokenAddress, tokenAmount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p></p>
      <label>Please specify:</label>
      <input type="text" name="address" placeholder=" contract address" value={tokenAddress} onInput={e => setAddress(e.target.value)}/>
      <br></br>
      <label>Please specify:</label>
      <input type="number" name="amount" placeholder=" amount to burn" value={tokenAmount} onInput={e => setAmount(e.target.value)}/>
      <br></br>
      <button class="button" type="submit">Submit</button>
    </form>
  );
}

function SendTx(token_type, token_amount) {
  const {user, web3} = useMoralis();
  const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
  const address = user.get("ethAddress");
  
  contract.methods.chipper(address, token_type, token_amount).send({from: address, value: 0})
    .on('transactionHash', (tx) => {
        console.log('transactionHash', tx)
    })
    .on('error', (error, receipt) => {
        console.log('Error - Receipt', error, receipt);
    })
    .on("receipt", function(receipt){ console.log(receipt); });

}


function App() {
  const { authenticate, isAuthenticated, user, logout, 
    enableWeb3, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis();
if (!isAuthenticated && !isWeb3EnableLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <div>
              <button class="button authenticateButton" onClick={() => authenticate()}>Authenticate</button>
            </div>
          </p>
        </header>
      </div>
    );
  } else if (isWeb3EnableLoading){
    return (
      <div>
        Loading Web3...
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <div>
          <button class="button logoutButton" onClick={() => logout()}>Log Out</button><p></p>
            <h2>Welcome user {user.get("username")}</h2>
            <h4>logged in with {user.get("ethAddress")}</h4></div>

          <div>Enter in Tokens to Chip</div>
          <Form />
        </p>

      </header>
    </div>
  );
}

export default App;
