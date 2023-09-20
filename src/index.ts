import express from "express";
import cors from "cors";
import { alunoRoutes, turmaRoutes } from "./routes";
import { authRoutes } from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes());
app.use("/aluno", alunoRoutes());
app.use("/turma", turmaRoutes());

const port = 3333;

app.listen(3333, () => {
    console.log(`API is running at port ${port}`);
});
