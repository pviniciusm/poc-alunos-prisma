import express from "express";
import cors from "cors";
import { alunoRoutes, turmaRoutes } from "./routes";
import { authRoutes } from "./routes/auth.routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes());
app.use("/aluno", alunoRoutes());
app.use("/turma", turmaRoutes());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`API is running at port ${port}`);
});
