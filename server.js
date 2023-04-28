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



app.listen(PORT, () => {
  console.log(chalk.inverse(`Listening on port ${PORT}`));
  //console.log(__dirname + '/frontend/index.html');
});