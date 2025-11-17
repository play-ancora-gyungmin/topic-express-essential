import express from "express";
const app = express();

// 인증 미들웨어: 토큰 검증 및 사용자 인증 수행
const authentication = (req, res, next) => {
  // 가상의 인증 로직 수행 (실제로는 데이터베이스 등에서 사용자 검증)
  const userData = {
    id: 1,
    username: "example_user",
  }; // DB 에서 사용자 정보 불러왔다고 가정
  const isAuthenticated = true; // 인증 성공 가정
  // TODO: 인증 실패했다면 401 상태코드와 "인증에 실패했습니다." 메시지 응답
  if (!isAuthenticated) {
    res.status(401).json({ message: "인증에 실패했습니다." });
  }
  // TODO: 인증 성공했다면 req.user 에 사용자 정보
  req.user = userData;
  next();
};

// /me 엔드포인트 - 인증 미들웨어 먼저 실행
app.get("/me", authentication, (req, res) => {
  // 인증 미들웨어를 통과했다면 req.user 사용 가능
  res.json(req.user);
});

// 서버 시작
app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});
