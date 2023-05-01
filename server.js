import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { dalTest, dalCreateUser } from './dal.js';
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3141;


// Gets app path
/*import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);*/


// Probar y usar? ↓
//app.use(express.json());
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

// Mongo Write Test
app.get('/mongotest', async (req, res) => {
  console.log(chalk.underline('/mongotest'));
  const insertResult = await dalTest();
  if (insertResult.acknowledged) {
    console.log(chalk.green(`MongoDB Success: ${JSON.stringify(insertResult)}`));
  } else {
    console.log(chalk.red(`MongoDB: Error ${JSON.stringify(insertResult)}`));
  }
  res.send('Basic Test works !');
});

// -----------------ROUTES-----------------

// Already logged in?
app.get('/alreadyloggedin', async (req, res) => {
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
});

//Sign Up
app.get('/signup/:name/:email/:password/:admin', async (req, res) => {
  console.log(chalk.underline(`/signup/`));
  const name = req.params.name;
  const email = req.params.email;
  const password = req.params.password;
  let admin = false;
  if (req.params.admin === 'true') admin = true;
  const auth = getAuth();
  let created = false;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;  
      created = true;
      if (admin) {
        console.log(chalk.green(`Firebase: Admin account created: ${name}, ${email}`));      
      } else {
        console.log(chalk.green(`Firebase: Normal account created: ${name}, ${email}`));      
      }
      res.send(true);  
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(chalk.red(`Account NOT created: ${errorMessage}`));
      res.send(`${errorCode}: ${errorMessage}`);
    });
  // --------------Mongo DAL--------------
  //console.log(`created? ${created}`);
  if (created) {
    const insertResult = await dalCreateUser(name, email, password, admin);
    if (insertResult.acknowledged) {
      console.log(chalk.green(`MongoDB Success:
        name: ${name}, 
        email: ${email}, 
        admin: ${admin}`));
    } else {
      console.log(chalk.red('MongoDB: Error'));
    }
  }
  // --------------Mongo DAL--------------
});

// Login user
app.get('/login/:email/:password', async (req, res) => {
  console.log(chalk.underline(`/login/`));
  const email = req.params.email;
  const password = req.params.password;
  const auth = getAuth();
  let user = {};
  let signResult = '';
  // -----Mongo DAL-----
  /*const insertResult = await dalActivity(email, 'login');
  if (insertResult.acknowledged) {
    console.log(chalk.green(`MongoDB Success: Login registered`));
  } else {
    console.log(chalk.red('MongoDB Error'));
  }
  const userInfo = await dalRead(email);
  const userInfoBasic = {
    user: userInfo[0].email,
    admin: userInfo[0].admin,
    balance: userInfo[0].balance
  };*/
  //console.log(chalk.redBright(JSON.stringify(userInfoBasic)));
  // -----Mongo DAL-----
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      //console.log(chalk.redBright(JSON.stringify(user.email)));
      console.log(chalk.green(`user ${req.params.email} logged in`));
      //res.send(user);
      signResult = user;
    })
    .catch((error) => {
      //errorCode = error.code;
      const errorMessage = error.message;
      console.log(chalk.red(`user ${req.params.email} ${errorMessage}`));
      //res.send(errorMessage);
      signResult = errorMessage;
    })
    .finally(() => {
      res.send(signResult);
    });
  //console.log(chalk.redBright(JSON.stringify(user)));
  
});

// Logout user
app.get('/logout/:email', async (req, res) => {
  console.log(chalk.underline(`/logout/`));
  const email = req.params.email;
  const auth = getAuth();
  let signResult = '';
  // -------Mongo DAL-------
  /*const insertResult = await dalActivity(email, 'logout');
  if (insertResult.acknowledged) {
    console.log(chalk.green(`MongoDB Success: Logout registered`));
  } else {
    console.log(chalk.red('MongoDB Error'));
  }*/
  // -------Mongo DAL-------

  // Todavía dá error de sincronía
  // "Cannot set headers after they are sent to the client"
  signOut(auth)
    .then(() => {
      console.log(chalk.yellow(`user logged out`));
      //res.send(`user logged out`);
      signResult = `user logged out`;
    })
    .catch((error) => {
      console.log(chalk.red(`Error in logging out`));
      //res.send(`Error in logging out`);
      signResult = `Error in logging out`;
    })
    .finally(() => {
      res.send(signResult);
    });  
});



app.listen(PORT, () => {
  console.log(chalk.inverse(`Listening on port ${PORT}`));
  //console.log(__dirname + '/frontend/index.html');
});