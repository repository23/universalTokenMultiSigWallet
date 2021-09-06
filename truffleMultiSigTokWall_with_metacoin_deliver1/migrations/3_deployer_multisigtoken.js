const { number } = require("yargs");

const MultiSigTokenWallet = artifacts.require("./MultiSigTokenWallet.sol")

module.exports =  function (deployer, network, accounts) {
  const newowners= accounts.slice(0,2) 
  const newrequired = 2
 deployer.deploy(MultiSigTokenWallet,newowners,newrequired);
}


