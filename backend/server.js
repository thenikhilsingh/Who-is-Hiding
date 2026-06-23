const express = require("express");
const dotenv = require("dotenv");
const indexRouter = require("./routers/indexRouter");
const connectDB = require("./config/db");
dotenv.config();

const app = express();

app.use("/api/health", indexRouter);

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`the server is listening on http://localhost:${PORT}`);
  });
});
