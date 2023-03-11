import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { client } from "../dbConfig/db.js";
const registerPerson = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }
        const existingPerson = await client.query(`SELECT email FROM person WHERE EXISTS(SELECT email FROM person WHERE email = '${email}');`);
        if (existingPerson.rowCount !== 0) {
            res.status(400);
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const _id = crypto.randomUUID();
        await client.query(`INSERT INTO person (_id, email, password) VALUES ('${_id}', '${email}', '${hashedPassword}');`);
        res
            .status(201)
            .json({ message: "User added successfully", token: generateToken(_id) });
    }
    catch (err) {
        if (err instanceof Error) {
            res
                .status(400)
                .json({ message: "Failed to add user", error: err.message });
        }
    }
};
const loginPerson = async (req, res) => {
    try {
        const { email, password } = req.body;
        const person = await client.query(`SELECT * FROM person WHERE email = '${email}';`);
        if (person.rowCount === 0) {
            res.status(400);
            throw new Error("User does not exist");
        }
        if (person && (await bcrypt.compare(password, person.rows[0].password))) {
            res.status(200).json({
                message: "User logged in successfully",
                token: generateToken(person.rows[0]._id),
            });
        }
        else {
            res.status(400);
            throw new Error("Invalid password");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res
                .status(400)
                .json({ message: "Failed to login user", error: err.message });
        }
    }
};
const getPerson = async (req, res) => {
    try {
        res.status(200).json(req.params.person);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: "User not found", error: err.message });
        }
    }
};
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
export { registerPerson, loginPerson, getPerson };
