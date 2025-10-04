import express from "express";
import cors from "cors";
import { makeRoutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", makeRoutes());

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
