const { assert, expect } = require("chai")
const { ethers, network, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic Nft unit test", () => {
        let basicNft, deployer
          beforeEach(async function () {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
              await deployments.fixture(["all"])
              basicNft = await ethers.getContract("BasicNft", deployer)
          })
          describe("Test for constructor", () => {
              it("Initialy sets the counter to 0", async () => {
                  const counter = await basicNft.getTokenCounter()
                  assert.equal(counter, 0)
              })
              it("Sets the correct name", async()=>{
                const _name = await basicNft.name()
                assert.equal(_name,"Dogie")
              })
              it("Sets the correct Symbol", async()=>{
                const _symbol = await basicNft.symbol()
                assert.equal(_symbol,"DOG")
              })
          })
          describe("Mints the nft", ()=>{
            it("sets the correct token uri",async()=>{
                const tx=  await basicNft.mintNft()
                tx.wait(1)
                const newCounter  = await basicNft.getTokenCounter()
                assert(newCounter, 1)
            })
            it("Show the correct balance and owner of an NFT", async function () {
                const tx=  await basicNft.mintNft()
                tx.wait(1)
                const deployerAddress = deployer.address;
                console.log(deployerAddress)
                const deployerBalance = await basicNft.balanceOf(deployerAddress)
                const owner = await basicNft.ownerOf("0")
  
                assert.equal(deployerBalance.toString(), "1")
                assert.equal(owner, deployerAddress)
            })
          })
      })
