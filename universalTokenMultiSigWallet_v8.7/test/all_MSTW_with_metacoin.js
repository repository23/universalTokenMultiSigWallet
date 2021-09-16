const MetaCoin = artifacts.require("MetaCoin");
const universalTokenMultiSigWallet = artifacts.require("./universalTokenMultiSigWallet.sol")
var erc20testcoinADR="0x0";
var meta;

contract('MetaCoin', (accounts) => {
  it('should put 10000 MetaCoin in the first account', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    const balance = await metaCoinInstance.getBalance.call(accounts[0]);
    
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
	  
    console.log("MetaCoinToken address");

    console.log(erc20testcoinADR=metaCoinInstance.address);
    
    const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const metaCoinInstance = await MetaCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});



contract('universalTokenMultiSigWallet', async(accounts) => {
  let instanceMWST; 
  before(async () => {
    const newowners= accounts.slice(0,2) 
    const newrequired = 2
    instanceMWST = await universalTokenMultiSigWallet.new(newowners,newrequired);
    meta = await MetaCoin.new();
  });
const account_one = accounts[0];
const account_two = accounts[1];
const account_3 = accounts[2];
const account_4 = accounts[3];


      /////////////////////////////////////////
///////////// sneding coins
///////////////////////////////////////


      it("should have coins correctly", async() => {
        // Get initial balances of first and second account.
 
        let balance;
    
        const amount = 1000;
    
      
        balance = await meta.getBalance.call(account_one);
        const account_one_starting_balance1 = balance.toNumber();
    
      //  balance = await meta.getBalance.call(account_two);
      //  const account_two_starting_balance2 = balance.toNumber();
        await meta.sendCoin(instanceMWST.address, amount, { from: account_one });
        
        balance = await meta.getBalance.call(instanceMWST.address);
        var balancewalleta = balance.toNumber();
        
        assert.equal(
          balancewalleta,
          amount,
          "Amount wasn't correctly taken from the sender after 1 transactions to wallt"
        );
  
        await meta.sendCoin(instanceMWST.address, amount, { from: account_one });
       
        balance = await meta.getBalance.call(instanceMWST.address);
        console.log("TestTokens in smartcontract"+balance)
        balancewalleta = balance.toNumber();
        
        await meta.sendCoin(account_two, amount, { from: account_one });
   

        balance = await meta.getBalance.call(account_one);
        const account_one_ending_balance1 = balance.toNumber();
    
        balance = await meta.getBalance.call(account_two);
        account_two_ending_balance2 = balance.toNumber();
    
        assert.equal(
          account_one_ending_balance1,
          account_one_starting_balance1 - 3*amount,
          "Amount wasn't correctly taken from the sender after 2 transactions"
        );

        assert.equal(
          balancewalleta,
          2*amount,
          "Amount wasn't correctly sent to the TokenMultiSigWallet"
        );

       });     
       
       
       it("should have submit transaction correctly", async() => {
      

        let ethvalue=10;
        console.log("submit transactions")

        let trans1id = await instanceMWST.submitTransaction(account_4, ethvalue, { from: account_one });
        let trans2id = await instanceMWST.submitTransaction(account_4, 2*ethvalue, { from: account_one });
        let trans3id = await instanceMWST.submitTokenTransaction(meta.address, account_4, 500, { from: account_one });
        
        let transactionsNumber = await instanceMWST.getTransactionCount(1,1, { from: account_one });
        
        console.log(trans1id,trans2id,trans3id)
        
        console.log(transactionsNumber)

        assert.equal(
          transactionsNumber,
          3,
          "Wrong number of submitted Transactions"
        );



       });

       it("should have confirm  transaction correctly", async() => {
      
         let ethvalue=10;

         console.log("confirmations")
         let transid1confirms = await instanceMWST.getConfirmations(0, { from: account_one });
         assert.equal(
          transid1confirms,
          0,
          "Wrong number of confirmations should be 0 at beggining"
        );
         


        console.log("submit transactions")

        let trans1id = await instanceMWST.submitTransaction(account_4, ethvalue, { from: account_one });
        let trans2id = await instanceMWST.submitTransaction(account_4, 2*ethvalue, { from: account_one });
        let trans3id = await instanceMWST.submitTokenTransaction(meta.address, account_4, 500, { from: account_one });
        
        let transactionsNumber = await instanceMWST.getTransactionCount(1,1, { from: account_one });
        
        console.log(trans1id,trans2id,trans3id)

        assert.equal(
          transactionsNumber,
          3,
          "Wrong number of submitted Transactions"
        );
        


       });






});    
      













// universalTokenMultiSigWallet contract closure
