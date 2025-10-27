import { dbConnection } from "../db/db.js";
export async function getGenres(req, res) {
    const db = await dbConnection();
    const genreRows = await db.all(`SELECT DISTINCT genre FROM products`)

    // Obj -> array
    const genres = genreRows.map(row => row.genre)

    console.log(genreRows)
    console.log(genres)
    console.log('Fetching genres from the database...');
    res.json(genres);
}
export async function getProducts() {
    console.log('Fetching products from the database...');
}