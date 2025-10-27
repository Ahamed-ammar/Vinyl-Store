import { dbConnection } from './db/db.js'

const deleteTable = async () => {
    const db = dbConnection();
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