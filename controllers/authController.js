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