import jwt from 'jsonwebtoken';

// Middleware to verify JWT
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extract the token

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }

            req.user = user; // Save the decoded token payload (e.g., user details) in req.user
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token provided
    }
};
