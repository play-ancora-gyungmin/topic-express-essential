import express from "express";

const userRouter = express.Router();

userRouter
  .route("/")
  .get((req, res) => {
    res.json({ message: "User 목록 보기" });
  })
  .post((req, res) => {
    res.json({ message: "User 추가하기" });
  });

export default userRouter;
