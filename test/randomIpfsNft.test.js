const { assert, expect } = require("chai")
const { ethers, network, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random Nft unit test", () => {
          let randomNft, vrfCoordinatorV2mock
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["randomipfs"])
              randomNft = await ethers.getContract("RandomIpfsNft", deployer)
              vrfCoordinatorV2mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
          })
          describe("Constructor", () => {
              it("Sets the starting value correctly", async () => {
                  const initialized = await randomNft.getInitialized()
                  const dogTokenUriZero = await randomNft.getDogTokenUris(0)
                  assert(dogTokenUriZero.includes("ipfs://"))
                  assert.equal(initialized, true)
              })
          })
          describe("requestNft", () => {
              it("fails if transaction amount is zero", async () => {
                  await expect(randomNft.requestNft()).to.be.revertedWith(
                      "RandomIpfsNft__NeedMoreETHSent"
                  )
              })
              it("Fails if the transaction amount is less then the mint fee", async () => {
                  const fee = await randomNft.getMintFee()
                  await expect(
                      randomNft.requestNft({
                          value: fee.sub(ethers.utils.parseEther("0.001")),
                      })
                  ).to.be.revertedWith("RandomIpfsNft__NeedMoreETHSent")
              })
              it("emits a event and kicks off a random words request", async () => {
                  const fee = await randomNft.getMintFee()
                  await expect(randomNft.requestNft({ value: fee.toString() })).to.emit(
                      randomNft,
                      "NftRequested"
                  )
              })
          })
          describe("Fullfill randoms words", () => {
              it("mints nft after randndom number returned", async () => {
                  await new Promise(async (resolve, reject) => {
                      randomNft.once("NftMinted", async () => {
                          try {
                              const tokenUri = await randomNft.getDogTokenUris("0")
                              const counter = await randomNft.getTokenCounter()
                              assert.equal(tokenUri.toString().includes("ipfs://"), true)
                              assert.equal(counter.toString(), "1")
                              resolve()
                          } catch (e) {
                              console.log(e)
                              reject(e)
                          }
                      })
                      try {
                          const fee = await randomNft.getMintFee()
                          const requestNftResponses = await randomNft.requestNft({
                              value: fee.toString(),
                          })
                          const txReceipt = await requestNftResponses.wait(1)
                          await vrfCoordinatorV2mock.fulfillRandomWords(
                              txReceipt.events[1].args.requestId,
                              randomNft.address
                          )
                      } catch (e) {
                          console.log(e)
                          reject(e)
                      }
                  })
              })
          })
          describe("getBreedFromModdedRng", () => {
              it("Should return a pug if moddedRng<10", async () => {
                  const expectedValue = await randomNft.getBreedFromModdedRng(5)
                  assert.equal(expectedValue, 0)
              })
              it("Should return a Shiba if moddedRng", async () => {
                  const expectedValue = await randomNft.getBreedFromModdedRng(20)
                  assert.equal(expectedValue, 1)
              })
              it("Should  return a St_bernard", async () => {
                  const expectedValue = await randomNft.getBreedFromModdedRng(75)
                  assert.equal(expectedValue, 2)
              })
          })
      })
