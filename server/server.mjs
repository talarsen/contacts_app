import express from "express";
import mime from "mime-types";

import contactRouter from "./contactRouter.mjs";
import taskRouter from "./taskRouter.mjs";

const app = express();
/***ROUTERS***/
//any time we need to access data from the front-end we need to implement app.use(express.json()) which allows us to access the req.body. We can get json data
app.use("/api/tasks", taskRouter);
app.use("/api/contacts", contactRouter);

// Do not comment out or delete this end point. The React development server
// won't start until it pings this end point successfully.
app.get("/api/ping", (request, response) =>
  response.json({ response: "pong" }),
);

if (process.env?.SERVE_REACT?.toLowerCase() === "true") {
  app.use(
    express.static("/app", {
      maxAge: "1d",
      setHeaders: (res, path) =>
        ["application/json", "text/html"].includes(mime.lookup(path)) &&
        res.setHeader("Cache-Control", "public, max-age=0"),
    }),
  );

  app.get("*", (req, res) => {
    res.sendFile("/app/index.html");
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Example server listening at http://localhost:${port}`);
});
