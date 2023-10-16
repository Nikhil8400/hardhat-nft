# NFT Project README

Welcome to our NFT project! In this endeavor, we've crafted three distinct types of Non-Fungible Tokens (NFTs), each showcasing unique features and creative potential. This README will serve as your comprehensive guide to the project, its components, how to utilize it effectively, and important configurations.

## Table of Contents

1. [NFT Types](#nft-types)
    - [Basic NFT](#basic-nft)
    - [Dynamic SVG NFT](#dynamic-svg-nft)
    - [Random NFT](#random-nft)
2. [Deployment](#deployment)
3. [Testing](#testing)
4. [Setup](#setup)
5. [How to Use](#how-to-use)
6. [Getting Help](#getting-help)

## NFT Types

### Basic NFT

- **File:** `BasicNFT.sol`
- The simplest of the lot, the Basic NFT allows you to create NFTs for anything you can imagine. It's perfect for those who want an uncomplicated, no-frills NFT creation process. 

### Dynamic SVG NFT

- **File:** `DynamicSvgNFT.sol`
- Ever wanted NFTs to reflect real-world conditions? The Dynamic SVG NFT contract mints tokens based on the price of Ethereum. If the Ethereum price is below a predefined threshold, you'll receive an NFT with a sad face. But if the price surpasses that threshold, you can mint an NFT with a smiley face. We've harnessed the power of Chainlink Price Feeds to make it happen.

### Random NFT

- **File:** `RandomNFT.sol`
- Are you feeling lucky? The Random NFT contract offers a whimsical twist, allowing you to acquire one of three unique NFTs based on pure luck. If fortune smiles upon you, you might even score a super rare NFT. We've ensured fairness by integrating Chainlink VRF (Verified Random Numbers) for the luck-based selection process.

## Deployment

- We've streamlined the deployment process with handy scripts for all three NFT contracts. This simplifies the setup and ensures you can quickly get started with your NFT project.

## Testing

- Thorough testing is crucial to ensure the reliability and correctness of the contracts. We've included a comprehensive suite of tests to validate that every aspect of the project functions as intended. Running these tests is a wise first step.

## Setup

Before you embark on your NFT journey, there are a few setup steps to follow:

- Create an `.env` file in the project directory, populating it with the following key-value pairs:

    - `SEPOLIA_RPC_URL`: Your Ethereum RPC URL
    - `PRIVATE_KEY`: Your Ethereum private key
    - `ETHERSCAN_API_KEY`: Your Etherscan API key
    - `COINMARKETCAP_API_KEY`: Your CoinMarketCap API key
    - `UPDATE_FRONT_END`: A flag to indicate whether to update the frontend
    - `PINATA_API_KEY`: Your Pinata API key
    - `PINATA_API_SECRET`: Your Pinata API secret
    - `UPLOAD_TO_PINATA`: A flag to specify if you want to upload to Pinata

## How to Use

Now that everything is set up, you're ready to dive into the world of NFT creation. Here's a step-by-step guide:

1. **Clone the Repository:** Begin by cloning this repository to your local machine.

2. **Configure the Environment:** Create the `.env` file with the essential variables mentioned in the setup section and add your actual credentials.

3. **Deploy the Contracts:** Execute the deployment scripts to deploy the NFT contracts to the Ethereum network.

4. **Testing:** Confirm that everything is functioning correctly by running the comprehensive tests we've provided.

5. **Start Minting:** You're now all set to mint NFTs based on your preferences. Choose the NFT type that suits your creativity or luck!

## Getting Help

Should you have any questions, need assistance, or want to collaborate, please don't hesitate to reach out. Your success in the NFT world is our top priority. Happy minting!

---
_This project README is crafted with care and creativity to ensure that you have the best experience with our NFT ecosystem._
