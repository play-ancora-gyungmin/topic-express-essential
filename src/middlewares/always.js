const always = (req, res, next) => {
  console.log("항상 실행");
  next();
};

export default always;
