import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis";


//placeholder code
const loadImage = () =>
  fetch("https://js3d87qgmd.execute-api.us-east-1.amazonaws.com/test/helloworld")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => console.log(res));


// loadImage();

function App() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  if (!isAuthenticated) {
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
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <div>
            <button class="button logoutButton" onClick={() => logout()}>Log Out</button>
            <h1>Welcome {user.get("username")}</h1>
          </div>

          <div>Enter in Tokens to Chip</div>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Token Address</label>
              <input type="text" class="form-control" id="exampleInputAddr" aria-describedby="tokenAddr" placeholder="Enter Token Addr"></input>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Token Amount</label>
              <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Token Amt"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </p>

      </header>
    </div>
  );
}

export default App;
