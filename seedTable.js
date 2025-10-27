import { dbConnection } from './db/db.js'
import { vinyl } from './data.js'


async function seedTable() {    
    const db = dbConnection();

    try {
        await db.exec('BEGIN TRANSACTION')

        for(const {title, artist, price, image, year, genre, stock} of vinyl) {
            await db.run(`INSERT INTO products (title, artist, price, image, year, genre, stock)
                VALUES(?, ?, ?, ?, ?, ?, ?)`, [title, artist, price, image, year, genre, stock]);
        }

        await db.exec('COMMIT')
        console.log('All Recorts insert sucessfully')
    }
    catch(err) {
        await db.exec('ROLLBACK')
        console.log(`Insert the data was failed:- ${err}`)
    } finally {
        await db.close();
        console.log('The Transaction Was Closed');
    }
}

seedTable();