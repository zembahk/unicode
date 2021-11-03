Solidity:
=========
Setup:

First copy the example environment file to .env
    
    cp .env.example .env

Generate a new mnemonic to use for testing and assign it to MNEMONIC in .env

Install dependencies:
```npm install```

Compile Contracts:
```npx hardhat compile```

Run tests:
```npx hardhat test```

Custom tasks:

Get a list of all Signer addresses:
```npx hardhat accounts```

Get a list of all named Signer addresses:
```npx hardhat namedAccounts```

