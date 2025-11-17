import express from "express";

const app = express();

app
  .route("/products")
  .get((req, res) => {
    res.json({ message: "Product 목록 보기" });
  })
  .post((req, res) => {
    res.json({ message: "Product 추가하기" });
  });

app
  .route("/products/:id")
  .patch((req, res) => {
    res.json({ message: "Product 수정하기" });
  })
  .delete((req, res) => {
    res.json({ message: "Product 삭제하기" });
  });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
