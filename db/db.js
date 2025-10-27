import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

export const dbConnection = async () => {  
    const db = open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    })
}