# Smart Contracts Exercise

Smart Contract to perform operations on the Aave Protocol.

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

## Upgradeable Migration

Despite an error blocking the testing of these scripts - I have included them under the Migrations folder, and they can be run as follows:

```bash
truffle migrate --f 2 --to 2 --network kovan
truffle migrate --f 3 --to 3 --network kovan
```

## References 

https://www.notion.so/Flurry-Finance-51edb29f55c04763a37dd993cb7176da
