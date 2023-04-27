import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3141;
import chalk from 'chalk';
// Probar y usar? ↓
//app.use(express.urlencoded({ extended: true }));

//FIRST TEST
app.get('/', (req, res) => {
  console.log('someone hit /');
  res.send('Hello World');
});

app.listen(PORT, () => console.log(chalk.inverse(`Listening on port ${PORT}`)));