import jwt from "jsonwebtoken";
import { client } from "../dbConfig/db.js";
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // type predicate to make sure decoded is a payload
                function isPayload(decoded) {
                    return decoded._id !== undefined;
                }
                if (isPayload(decoded)) {
                    const person = await client.query(`SELECT * FROM person WHERE _id = '${decoded._id}';`);
                    delete person.rows[0].password;
                    req.params.user = person.rows[0];
                }
                next();
            }
            catch (err) {
                if (err instanceof Error) {
                    res
                        .status(401)
                        .json({ message: "Not authorized", error: err.message });
                }
            }
        }
        else {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res
                .status(400)
                .json({ message: "Failed to get current user", error: err.message });
        }
    }
};
export default protect;
