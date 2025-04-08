// THIS IS STILL USING V5


const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.PROD_KEY);  // prodKey
// const api = new Easypost(process.env.TEST_KEY);     // testKey
// const api = new Easypost(process.env.WEBHOOK_CHILD_PROD_KEY);  // WEBHOOK_CHILD_PROD_KEY    



// **** If no user id is passed in, the user returned is the owner of the api key.

// RETRIEVE YOUR ACCOUNT
// api.User.retrieve().then(console.log).catch(console.log);


// RETRIEVE A CHILD ACCOUNT
// api.User.retrieve('user_0cc536d449d14199b4fea5d1b9dfcf72').then(console.log).catch(console.log);


// RETRIEVE ALL API KEYS (YOURS AND YOUR CHILDREN)
api.ApiKey.all().then(console.log).catch(console.log)