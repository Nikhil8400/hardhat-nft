const { ethers } = require("hardhat")

const networkConfig = {
    11155111: {
        name: "sepolia",
        vrfCoordinatorV2: "0x8103b0a8a00be2ddc778e6e7eaa21791cd364625",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        subscriptionId: "5350",
        callbackGasLimit: "500000",
        keepersUpdateInterval: "30",
        mintFee: "10000000000000000",
        ethPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    31337: {
        name: "hardhat",
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        callbackGasLimit: "500000",
        keepersUpdateInterval: "30",
        mintFee: "10000000000000000",
    },
}

const developmentChains = ["hardhat", "localhost"]
const frontEndContractsFile = "../nextjs-smart-contract-raffle/constants/contractAddresses.json"
const frontEndAbiFile = "../nextjs-smart-contract-raffle/constants/abi.json"

module.exports = { networkConfig, developmentChains, frontEndContractsFile, frontEndAbiFile }
