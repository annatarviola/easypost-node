/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============CREATE A CHILD USER============
try {
  const user = await client.User.create({
    name: 'Child Account Name',
  });

  console.log(user);
} catch (error) {
  console.log("   ")
  console.log("CHILD USER CREATE ERROR:")
  console.log(error)
}