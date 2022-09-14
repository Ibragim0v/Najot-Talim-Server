require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));
