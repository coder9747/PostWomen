import express from "express";

const app = express();

app.use(express.json());

app.post("/test", (req, res) => {
  const body = req.body;
  const headers = req.headers;
  console.log(body, headers);
  res.json(true);
});

app.listen(4000, () => {
  console.log("Server Running At Port 4000");
});
