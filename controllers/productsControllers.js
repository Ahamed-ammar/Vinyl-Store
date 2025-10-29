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
        let query = `SELECT * FROM products`;
        let params = []
        const { genre, search } = req.query

        if (genre) {
            query += ' WHERE genre = ?'
            params.push(genre)
        }
        else if(search) {
            query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ? OR year LIKE ? OR price LIKE ?'
            const searchTerm = `%${search}%`
            params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm)

            // query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
            // const searchPattern = `%${search}%`
            // params.push(searchPattern, searchPattern, searchPattern)
        }
        const productsRows = await db.all(query, params)
        console.log('Fetching Products from database...')
        res.json(productsRows);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch products', details: err.message})
    }
}