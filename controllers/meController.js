import { getDBConnection } from "../db/db.js";

export async function getCurrentUser(req, res) {
    try  {
        const db = await getDBConnection();
        if (!req.session.userId) {
            return res.json({ isLoggedIn: false });
        }

        const user = awaitdb.get('SELECT name FROM users WHERE id = ?', [req.session.userId]);

        res.json({
            isLoggedIn: true,
            name: user.name
        });
    }
    catch(error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}