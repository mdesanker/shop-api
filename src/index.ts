require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
