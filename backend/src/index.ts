import { router } from "./controller/Routs";
import express from "express";
import cors from "cors";

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen({ port: PORT }, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});

module.exports = { express };
