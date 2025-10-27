import { dbConnection } from "../db/db.js";
export async function getGenres(req, res) {
    try{
        const db = await dbConnection();
        const genreRows = await db.all(`SELECT DISTINCT genre FROM products`)
        // Obj -> array
        const genres = genreRows.map(row => row.genre)
        console.log('Fetching genres from the database...');
        res.json(genreRows);
    }
    catch(err) {
        res.status(500).json({error: 'Failed to fetch genre', details: err.message});
    }
}
export async function getProducts(req, res) {
    try {
        const db = await dbConnection()
        const productsRows = await db.all(`SELECT * FROM products`)
        console.log('Fetching Products from database...')
        res.json(productsRows);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch products', details: err.message})
    }
}