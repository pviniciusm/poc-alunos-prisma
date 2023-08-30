import express from "express";
import cors from "cors";
import { alunoRoutes } from "./routes/aluno.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/aluno", alunoRoutes());

const port = 3333;

app.listen(3333, () => {
    console.log(`API is running at port ${port}`);
});
