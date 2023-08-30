import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3333;

app.listen(3333, () => {
    console.log(`API is running at port ${port}`);
});
