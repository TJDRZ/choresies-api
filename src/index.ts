import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//app.use(some route)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));