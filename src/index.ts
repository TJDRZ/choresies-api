import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./dbConfig/db.js";
connectDB();
import personRouter from "./routes/person.js";
import choreRouter from "./routes/chore.js"

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/person", personRouter);
app.use("/api/chore", choreRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
