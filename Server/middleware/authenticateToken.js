import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

// import jwt from 'jsonwebtoken'

// const secretKey = "secret4123key456for798token"
// const issuer = "JOYFULJOURNEYS"

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (!token)
//         return res.sendStatus(403).send("no access Token");
//     try {
//         const verified = jwt.verify(token, secretKey, { "issuer": issuer });
//         if (!verified) {
//             return res.status(401).send("Invalid Token");
//         }
//         return next();
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
// };



// export const signRefreshtoken = (username) => {
//     return jwt.sign({ id: username }, secretKey, {
//         expiresIn: "1d",
//     })
// }

