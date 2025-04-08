/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey


try {
    const refund = await client.Refund.create({
        carrier: 'USPS',
        tracking_codes: ['EZ1000000001']
    })
    console.log(refund)
    
} catch (error) {
    console.log("   ")
    console.log("REFUND ERROR:")
    console.log(error)
}