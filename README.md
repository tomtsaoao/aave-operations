# Smart Contracts Exercise

Smart Contract to deposit, withdraw and check collateral value of ERC20 tokens on the Aave Protocol.

## Configuration

After cloning this repository, please perform the following configurations
#### node

```bash
npm install
```

#### truffle-config.js:
(Line 53) Change the Kovan endpoint URL to include your Infura Project ID:

```bash
https://kovan.infura.io/v3/{Your Infura Project ID}
```

#### .secret
Input your mnemonic phrase in this file

## Run Smart Contract

### Compile

```bash
truffle compile --all
```

### Migration

```bash
truffle migrate --f 1 --to 1 --network kovan
```

### Test

```bash
truffle exec ./test/test.js --network kovan
```
