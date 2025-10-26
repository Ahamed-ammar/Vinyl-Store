import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { vinyl } from './data'

async function seedTable() {    
    const db = await open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    })

    await db.exec(`
        INSERT INTO products(id, title, artist, price, image, year, genre, stock) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?), ()
        
    `)

  await db.close()
      console.log('table created')
}

seedTable();