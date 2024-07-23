import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/userRoutes";

dotenv.config();
const app = express();
app.use(express.json());

// Await db connection
try {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connected Successfully");
  });
} catch (error) {
  console.log(error);
}

// Middlewares

app.use("/user", router);

app.listen(3000, () => {
  console.log("Server started running at 3000");
});
