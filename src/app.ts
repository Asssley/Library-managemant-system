import dotenv from "dotenv";
import expressApp from "./buildApp.js";
dotenv.config();

const PORT = process.env.PORT ?? 3000;

let app = expressApp;

app.listen(PORT, (err) => { err ? console.log(err): console.log(`Server is listening port ${PORT}`) })