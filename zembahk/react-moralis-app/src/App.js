import logo from './logo.svg';
import './App.css';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { contractAbi, CONTRACT_ADDRESS } from "./abi.js";
import React, { useState } from 'react';

//placeholder code

const requestOptions = {
  body: "{}",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST",
  mode: 'cors',
};
//fetch('http://localhost:9000/2015-03-31/functions/function/invocations', requestOptions)
 // .then(response => response.json())
 // .then(data => console.log(data));


function Form() {

  const [tokenAddress, setAddress] = useState('');
  const [tokenAmount, setAmount] = useState(''); // '' is the initial state value
  const { user } = useMoralis();
  //const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
  const address = user.get("ethAddress");
  const { fetch } = useWeb3ExecuteFunction({
      abi: contractAbi,
      contractAddress: CONTRACT_ADDRESS,
      functionName: "chipper",
      params: {
        account: address,
        token: tokenAddress,
        amount: tokenAmount
      },
    });
    
  //console.log(address);
  function handleSubmit(e) {
    e.preventDefault();
    
    console.log('You clicked submit.');
    console.log(tokenAddress);
    console.log(tokenAmount);
    //SendTx(address, contract, tokenAddress, tokenAmount);

  }


  return (
    <form onSubmit={handleSubmit}>
      <p></p>
      <label>Please specify:</label>
      <input type="text" name="address" placeholder=" contract address" value={tokenAddress} onInput={e => setAddress(e.target.value)} />
      <br></br>
      <label>Please specify:</label>
      <input type="number" name="amount" placeholder=" amount to burn" value={tokenAmount} onInput={e => setAmount(e.target.value)} />
      <br></br>
      <button class="button" type="submit" onClick={() => fetch()} >Submit</button>
    </form>
  );
}

function SendTx(address, contract, token_type, token_amount) {
 
  contract.methods.chipper(address, token_type, token_amount).send({ from: address, value: 0 })
    .on('transactionHash', (tx) => {
      console.log('transactionHash', tx)
    })
    .on('error', (error, receipt) => {
      console.log('Error - Receipt', error, receipt);
    })
    .on("receipt", function (receipt) { console.log(receipt); });


  /* code for storing a file
  const base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
  const exampleFile = new useMoralis().File("myfile.txt", { base64: base64 });
  exampleFile.save().then(function() {
    // The file has been saved to Moralis.
    alert("Successfully Saved File To Moralis")
  }, function(error) {
    // The file either could not be read, or could not be saved to Moralis.
    alert("Failed to Save to Moralis Server")
  }); */

}


function App() {
  const { authenticate, isAuthenticated, user, logout,
    enableWeb3, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis();
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
          <h4>logged in with {user.get("ethAddress")}</h4></div>

        <div>Enter in Tokens to Chip</div>
        <Form />


      </header>
    </div>
  );
}

export default App;
