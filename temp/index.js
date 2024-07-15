import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/order", (req, res) => {
  const body = req.body;
  console.log(body);
  res.json({
    succes: true,
    message: "Server Running Succesful",
  });
});


app.listen(5000,()=>
{
    console.log("Server Runnin AT Port 5000");
})