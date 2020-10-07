import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import checkRouter from "./routes/check.js";
import saveRouter from "./routes/save.js";
import accountRouter from "./routes/account.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../build")));

app.use("/", indexRouter);
app.use("/check", checkRouter);
app.use("/save", saveRouter);
app.use("/account", accountRouter);
export default app;
