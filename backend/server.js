const express = require("express");
const dotenv = require("dotenv");
const indexRouter = require("./routers/indexRouter");
const connectDB = require("./config/db");
const gameRouter = require("./routers/gameRouter");
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/health", indexRouter);
app.use("/api/game", gameRouter);

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`the server is listening on http://localhost:${PORT}`);
  });
});
