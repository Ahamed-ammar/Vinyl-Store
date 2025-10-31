import validator from 'validator';
export async function registerUser(req, res) {
    console.log('req.body: ', req.body)
    console.log('Request Type:- ', typeof req.body)
    console.log('Request Keys:- ', Object.keys(req.body))
    console.log('Request Values:- ', Object.values(req.body))
    console.log('Request Entries:- ', Object.entries(req.body))
    let { name, email, username, password } = req.body

    if(!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }
    
    name = name.trim()
    email = email.trim()
    username = username.trim()
    
    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
        return res.status(400).json({ error: 'Username must be 1–20 characters, using letters, numbers, _ or -.' })
    }
    
    if(!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address.' })
    }
    console.log(req.body);
}