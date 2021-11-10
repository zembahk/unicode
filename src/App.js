import logo from './logo.svg';
import './App.css';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { contractAbi, CONTRACT_ADDRESS } from "./abi.js";
import React, { useState } from 'react';


function Form() {

  const [tokenAddress, setAddress] = useState('');
  const [tokenAmount, setAmount] = useState(''); 
  const { user } = useMoralis();
  const address = user.get("ethAddress");
  const { fetch } = useWeb3ExecuteFunction({
      abi: contractAbi,
      contractAddress: CONTRACT_ADDRESS,
      functionName: "someContractFunciton", // edit this to the function
    
      params: {
        account: address,
        token: tokenAddress, // edit to the contract function required inputs
        amount: tokenAmount
      },
    });
    
  function handleSubmit(e) {
    e.preventDefault(); 
    
    console.log('You clicked submit.');
    console.log(tokenAddress);
    console.log(tokenAmount);

  }

  return (
    <form onSubmit={handleSubmit}>
      <p></p>
      <label>Please specify:</label>
      <input type="text" name="address" placeholder=" contract address" value={tokenAddress} onInput={e => setAddress(e.target.value)} />
      <br></br>
      <label>Please specify:</label>
      <input type="number" name="amount" placeholder=" amount to send" value={tokenAmount} onInput={e => setAmount(e.target.value)} />
      <br></br>
      <button class="button" type="submit" onClick={() => fetch()} >Submit</button>
    </form>
  );
}


function App() {
  const { authenticate, isAuthenticated, user, logout, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();
  if (!isAuthenticated && !isWeb3EnableLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p></p>
          <div>
            <button class="button authenticateButton" enabled={isWeb3Enabled.toString()} onClick={() => authenticate()}>Authenticate</button>
          </div>

        </header>
      </div>
    );
  } else if (isWeb3EnableLoading) {
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
        <p></p>
        <div>
          <button class="button logoutButton" onClick={() => logout()}>Log Out</button><p></p>
          <h2>Welcome user {user.get("username")}</h2>
          <h4>logged in with {user.get("ethAddress")}</h4>
        </div>

        <Form />


      </header>
    </div>
  );
}

export default App;
