module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777", // Match any network id
      gas: 6000000
    }
  },
  compilers: {
    solc: {
      version: "^0.4.5",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
