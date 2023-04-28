import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3141;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import chalk from 'chalk';
// Probar y usar? ↓
//app.use(express.urlencoded({ extended: true }));

// -------------------FIREBASE-------------------
//import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MSGSENDERID,
  appId: process.env.FIREBASE_APPID
};
const firebaseApp = initializeApp(firebaseConfig);
// -------------------FIREBASE-------------------


// Serve static files
app.use(express.static('frontend/build'));
//app.use(express.static(__dirname + '/frontend/build/index.html'));
//FIRST TEST
/*app.get('*', (req, res) => {
  //res.sendFile(__dirname + '/frontend/index.html');
  res.sendFile(__dirname + '/frontend/build/index.html');
});*/

// Basic Test
app.get('/basictest', (req, res) => {
  console.log(chalk.underline('Basic Test works !'));
  res.send('Basic Test works !');
});

// -----------------ROUTES-----------------

// Already logged in?
/*app.get('/alreadyloggedin', async (req, res) => {
  console.log(chalk.underline(`/alreadyloggedin/`));
  let userData = {};
  let loggedin = false;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      //const uid = user.uid;
      //console.log('user is LOGGED IN');
      userData = user;
      loggedin = true;
      //return res.send({ loggedin: true, user });
    } else {
      // User is signed out
      //console.log('user is NOT logged in');
      //return res.send({ loggedin: false });
    }
    res.send(userData);
  });  
});*/



app.listen(PORT, () => {
  console.log(chalk.inverse(`Listening on port ${PORT}`));
  //console.log(__dirname + '/frontend/index.html');
});