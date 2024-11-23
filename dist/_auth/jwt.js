import jwt from "jsonwebtoken";
const auth = {
    secret: process.env.SECRET_KEY ?? "StockWise",
    expires: "1d"
};
function signToken(payload) {
    return jwt.sign(payload, auth.secret, {
        expiresIn: auth.expires
    });
}
function verifyToken(token) {
    try {
        return jwt.verify(token, auth.secret);
    }
    catch (error) {
        return false;
    }
}
export { auth, signToken, verifyToken };
