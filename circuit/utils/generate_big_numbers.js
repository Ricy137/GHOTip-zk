const { ethers } = require('ethers');

const num = 20;

async function generate() {
  let randomNumbers = [];
  for (let i = 0; i < num; i++) {
    const randomBigNumber = ethers.BigNumber.from(ethers.utils.randomBytes(32));
    randomNumbers.push(randomBigNumber.toString());
  }
  console.log(randomNumbers.join(','));
}

generate().catch((err) => {
  console.log(err);
  process.exit(1);
});
