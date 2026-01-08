import express, { type Express, type Request, type Response } from "express";

let app: Express = express();

app.use(express.json);



app.use((req: Request, res: Response) => {
    res.sendStatus(404);
});
