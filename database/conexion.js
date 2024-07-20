import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString: process.env.DATABASE_URL
});

try{
    await db.query('SELECT NOW()');
    console.log('DATABASE conectada');
}catch(error){
    console.log(error);
}