import express from 'express';
import bodyParser from "body-parser";
import { IndexRouter } from "./controller/v0/index.router";


(async () => {
  // Init the Express application
  const app = express();
  var logger = require("morgan");

  // Set the network port
  const port = process.env.PORT || 8082;

  // Define middlewares
  app.use(bodyParser.json());
  app.use(logger("dev"));


  // Routing root / requests to IndexRouter
  app.use('/', IndexRouter)

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("Welcome to Udagram Image Filter => try GET /filteredimage");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
