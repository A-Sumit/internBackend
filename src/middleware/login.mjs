import jwt from 'jsonwebtoken';

export const login = (req, res) => {
    // Dummy user authentication (replace with real logic)
    const { username, password } = req.body;

    // Assuming username is "admin" and password is "password123"
    if (username === 'admin' && password === 'password123') {
        const user = { username }; // Token payload (can include more user info)

        // Generate a JWT token (valid for 1 hour)
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ accessToken });
    } else {
        res.status(403).json({ error: 'Invalid credentials' });
    }
};
