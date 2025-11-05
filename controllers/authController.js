import { getDBConnection } from '../db/db.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

export async function registerUser(req, res) {
    // console.log('req.body: ', req.body)
    // console.log('Request Type:- ', typeof req.body)   
    // console.log('Request Keys:- ', Object.keys(req.body))
    // console.log('Request Values:- ', Object.values(req.body))
    // console.log('Request Entries:- ', Object.entries(req.body))
    let { name, email, username, password } = req.body

    if(!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }
    
    name = name.trim()
    email = email.trim()
    username = username.trim()

    password = password.trim()
    
    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
        return res.status(400).json({ error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' })
    }
      
    if(!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address.' })
    }
    try {
        const db = await getDBConnection()
        const existingUser = await db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email])
        console.log('Existing user check:', existingUser);

        if(existingUser) {
            return res.status(400).json({ error: 'Username or email already in use.' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await db.run('INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)', 
            [name, email, username, hashedPassword])

        req.session.userId = result.lastID
        await db.close()
        return res.status(201).json({ message: 'User registered successfully' })
    }
    catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    
}
export async function loginUser(req, res) {
    let { username, password } = req.body;

    username = username.trim();
    // password = password.trim();

    if(!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
        return res.status(400).json({ error: 'Invalid Cretentials' })
    }

    try {
        const db = await getDBConnection();
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if(!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        } 

        console.log('User found:', user);
        req.session.userId = user.id;
        await db.close();
        return res.json({ message: 'Login successful' });
    }
    catch (err) {  
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Login failed. please try again.' });
    }
    
}

export async function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Logout failed. Please try again.' });
        }
        res.clearCookie('connect.sid');
        return res.json({ message: 'Logout successful' });
    });
} 