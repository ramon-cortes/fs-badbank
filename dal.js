import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";
import chalk from 'chalk';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'badbank';
const dbCollectionName = 'users';
const dbCollectionNameAct = 'activity';
//const adjustment = 100;


// TEST
export async function dalTest() {
  await client.connect();
  console.log(chalk.magenta(`MongoDB connected: ${dbName}-(${dbCollectionName})`));
  const db = client.db(dbName);  
  const collection = db.collection(dbCollectionName);
  const date = new Date().toLocaleString();
  const insertThis = {
    name: 'dd', 
    email: 'dd@dd.com', 
    password: '123456', 
    admin: false, 
    balance: 100,
    transactions: [
      {
        deposit: true,
        amount: 100,
        date
      }
    ]
  };
  const insertResult = await collection.insertOne(insertThis);
  client.close();
  console.log(chalk.magenta(`MongoDB DISconnected: ${dbName}-(${dbCollectionName})`));
  return insertResult; //.acknowledged
}




// CREATE
// User
export async function dalCreateUser(name, email, password, admin) {
  await client.connect();
  console.log(chalk.magenta(`MongoDB connected: ${dbName}-(${dbCollectionName})`));
  const db = client.db(dbName);  
  const collection = db.collection(dbCollectionName);
  const date = new Date().toLocaleString();
  const insertThis = {
    name, 
    email, 
    password, 
    admin, 
    balance: 100,
    transactions: [
      {
        deposit: true,
        amount: 100,
        date
      }
    ]
  };
  const insertResult = await collection.insertOne(insertThis);
  client.close();
  console.log(chalk.magenta(`MongoDB DISconnected`));
  return insertResult; //.acknowledged
}
// Activity
export async function dalActivity(email, action) {
  await client.connect();
  console.log(chalk.magenta(`MongoDB connected: ${dbName}-(${dbCollectionNameAct})`));
  const db = client.db(dbName);  
  const collection = db.collection(dbCollectionNameAct);
  const date = new Date().toLocaleString();
  const insertThis = {
    email,
    action,
    date
  };
  const insertResult = await collection.insertOne(insertThis);
  client.close();
  //setTimeout(() => {client.close()}, adjustment);
  return insertResult; //.acknowledged
}

// READ
export async function dalRead(thisEmail) {
  await client.connect();
  console.log(chalk.magenta(`MongoDB connected: ${dbName}-${dbCollectionName}`));
  const db = client.db(dbName);  
  const collection = db.collection(dbCollectionName);
  const dbContents = await collection.find({ email: thisEmail }).toArray();  
  console.log(chalk.redBright(`MongoDB Info sent: 
    email: ${dbContents[0].email}, 
    admin: ${dbContents[0].admin},
    balance: ${dbContents[0].balance}`));
  client.close();
  //setTimeout(() => {client.close()}, adjustment);
  //console.log('dbContents:', JSON.stringify(dbContents));
  return dbContents;
}

// UPDATE


