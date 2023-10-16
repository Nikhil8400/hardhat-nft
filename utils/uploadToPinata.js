const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET = process.env.PINATA_API_SECRET
const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET) //In order to work with pinata we have to pass  pinata api key and api secret

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath)
    console.log(`This is images ${fullImagesPath}`)
    const files = fs.readdirSync(fullImagesPath).filter((file) => file.includes(".jpg"))
    let responses = []
    console.log(`This is what is in files ${files}`)
    console.log("Uploading to Ipfs")
    for (const fileIndex in files) {
        console.log("Going to create a readable Strean for file")
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        console.log(readableStreamForFile)
        const options = {
            pinataMetadata:{
                name:files[fileIndex]
            },
        }
        try {
            await pinata.pinFileToIPFS(readableStreamForFile, options)
            .then((result)=>{
            responses.push(result)})
            .catch((err)=>{
                console.log(err)
            })
                
        } catch (e) {
            console.error(e)
        }
    }
    return { responses, files }
}


async function storeTokenUriMetadata(metadata){
    const options = {
        pinataMetadata:{
            name:metadata.name
        }
    }
    try{
        const response = await pinata.pinJSONToIPFS(metadata,options)
       
        return response
    }catch(e){
        console.log(e)
    }
    return null
}
module.exports = { storeImages, storeTokenUriMetadata }
