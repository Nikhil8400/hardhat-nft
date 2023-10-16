const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

const imagesLocation = "./images/randomNft/"
const metaDataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_type: "Magician",
            value: 100,
        },
    ],
}

let tokenUris = [
    "ipfs://QmPV1YTccwhpq4wAwSAFpyUtGbq5CnFUQx8mxCgsnsxzvN",
    "ipfs://QmeofB7bBCZYaKuogHFXUpnCgBTwddfDVpGdXxVMF4xDQ8",
    "ipfs://QmShqttVcN5ky9v7pXdJ2y1z7aDNNvn4KpEh3hFn8cXdog",
]

const FUND_AMOUNT = "10000000000000000000"

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let VRFCoordinatorV2Address, subscriptionId, VRFCoordinatorV2Mock

    if (process.env.UPLOAD_TO_PINATA == "true") {
        tokenUris = await handleTokenUris()
    }

    if (chainId == 31337) {
        VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        VRFCoordinatorV2Address = VRFCoordinatorV2Mock.address
        const tx = await VRFCoordinatorV2Mock.createSubscription()
        const txReceipt = await tx.wait(1)
        subscriptionId = txReceipt.events[0].args.subId
        await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
    } else {
        VRFCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }

    log("------------------------------------------------------------")

    const args = [
        VRFCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId].gasLane,
        networkConfig[chainId].mintFee,
        networkConfig[chainId].callbackGasLimit,
        tokenUris,
    ]
    const randomIpfsNft = await deploy("RandomIpfsNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (chainId == 31337) {
        await VRFCoordinatorV2Mock.addConsumer(subscriptionId, randomIpfsNft.address)
    }

    log("-----------------------------")
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying.....")
        await verify(randomIpfsNft.address, args)
    }
}

async function handleTokenUris() {
    tokenUris = []
    //We need to do 2 things
    //1) Store image in IPFs
    //2) Store the metadata in IPFS
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
    console.log(imageUploadResponses)
    for (const imageUploadResponsesIndex in imageUploadResponses) {
        //create metadata
        // upload the metadata
        let tokenUriMetaData = { ...metaDataTemplate }
        tokenUriMetaData.name = files[imageUploadResponsesIndex].replace(".jpg", "")
        tokenUriMetaData.description = `You have got an ${tokenUriMetaData.name} nft!!`
        tokenUriMetaData.image = `ipfs://${imageUploadResponses[imageUploadResponsesIndex].IpfsHash}`

        // store the jason to pinata
        console.log(`The token uri mata data is ${tokenUriMetaData}`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetaData)
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }

    console.log("Token uris uploaded They are.")
    console.log(tokenUris)
    return tokenUris
}
module.exports.tags = ["all", "randomipfs", "main"]
