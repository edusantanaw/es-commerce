import express from "express";
import routes from "./config/routes";

const app = express();
app.use(express.json());
routes(app);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server running at ${Port}`);
});
