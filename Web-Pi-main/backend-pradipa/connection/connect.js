import chalk from 'chalk';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { cyan, yellow, red } = chalk;

const connected = cyan;
const error = yellow;
const disconnected = red;

const Connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {});
    console.log(
      connected(`Mongoose default connection is open to ${process.env.DB_URI}`)
    );

    mongoose.connection.on('error', (err) => {
      console.log(error(`Mongoose connection error: ${err}`));
    });

    mongoose.connection.on('disconnected', () => {
      console.log(disconnected('Mongoose default connection is disconnected'));
    });

  } catch (err) {
    console.error(red(`Failed to connect to MongoDB: ${err.message}`));
    // Melempar ulang error agar proses yang memanggil tahu koneksi gagal
    throw err;
  }
};

export default Connect;