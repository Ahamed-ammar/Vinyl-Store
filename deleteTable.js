import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const deleteTable = async () => {
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    })
    try {   
        await db.exec(`DROP TABLE IF EXISTS products`)
        console.log('Deleted Sucessfully..')
    } catch(err) {
        console.log('Delete Table was Failed!!!')
    }
    finally {
        await db.close()
        console.log('The Transaction Finished Sucessfully....')
    }
    
}

deleteTable();