// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function main() {
  const GHOAddr = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60';
  // deploy hasher
  const Hasher = await hre.ethers.getContractFactory('Hasher');
  const hasher = await Hasher.deploy();
  await hasher.deployed();
  console.log('hasher:', hasher.address);
  const hasherAddress = hasher.address;

  // deploy verifier
  const Verifier = await hre.ethers.getContractFactory('Verifier');
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log('verifier:', verifier.address);
  const verifierAddress = verifier.address;

  // deploy ghoTip
  const GhoTip = await hre.ethers.getContractFactory('GhoTip');
  const ghoTip = await GhoTip.deploy(hasherAddress, verifierAddress, GHOAddr);
  await ghoTip.deployed();
  console.log('ghoTip:', ghoTip.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
