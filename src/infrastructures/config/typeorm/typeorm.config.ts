import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const config = new DataSource({
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  database: 'clean_db',
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  ssl: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

config
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default config;
