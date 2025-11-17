// 시연용 코드
import express from "express";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import always from "./middlewares/always.js";

const app = express();

app.use(always);

app.use("/products", productRouter);

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
