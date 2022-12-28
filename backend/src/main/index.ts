import express from "express";
import routes from "./config/routes";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(express.static("public"));
routes(app);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server running at ${Port}`);
});
