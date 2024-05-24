import jwt from 'jsonwebtoken';

function isValidToken(req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "appToken", (e, s) => {
            if (e) {
                return false
            } else {
                return true
            }
        })
    }
    return false;
}

export default isValidToken;