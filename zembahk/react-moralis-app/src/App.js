import logo from './logo.svg';
import './App.css';
import { useMoralis } from "react-moralis";

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
        </p>

      </header>
    </div>
  );
}

export default App;
