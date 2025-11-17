import express from "express";
const app = express();

app.use(express.json());

// 임시 토큰 및 사용자 데이터
const validTokens = {
  token123: { username: "user1", role: "user" },
  admin456: { username: "admin", role: "admin" },
};
// validTokens["admin456"]

// 임시 게시글 데이터
const posts = [
  { id: 1, title: "첫 번째 게시글", content: "안녕하세요!", author: "user1" },
  {
    id: 2,
    title: "공지사항",
    content: "새로운 기능이 추가되었습니다.",
    author: "admin",
  },
];

// 문제 1: 로깅 미들웨어 완성하기
// 간단하게 요청 경로와 시간을 콘솔에 기록
const logger = (req, res, next) => {
  // TODO:
  // 1. 현재 시간 구하기 (hint: new Date().toISOString())
  // 2. "요청 경로: [경로], 시간: [시간]" 형식으로 콘솔에 출력 (hint: req.path)
  // 3. next() 호출
  const date = new Date().toISOString();
  const path = req.path;
  console.log(`[요청경로]: ${path}, [시간]: ${date}`);
  next();
};

// 문제 2: Bearer 토큰 인증 미들웨어 완성하기
// Authorization 헤더에서 Bearer 토큰 확인
const authentication = (req, res, next) => {
  // TODO:
  // 1. req.headers에서 'authorization' 헤더 가져오기
  // 2. 헤더가 없으면 401 상태 코드와 함께 { message: '인증이 필요합니다.' } 응답
  // 3. 헤더가 'Bearer '로 시작하는지 확인
  // 4. 'Bearer ' 이후의 문자열을 토큰으로 추출 (const token = authHeader.split(' ')[1];)
  // 5. validTokens 객체에서 해당 토큰이 유효한지 확인
  // 6. 토큰이 유효하지 않으면 401 상태 코드와 함께 { message: '유효하지 않은 토큰입니다.' } 응답
  // 7. 토큰이 유효하면 next() 호출하여 다음 미들웨어로 진행
  const { authorization } = req.headers;
  if (!authentication || !authorization.includes("Bearer ")) {
    res.status(401).json({ message: "인증이 필요합니다." });
    return;
  }
  const token = authorization.split(" ")[1];
  if (!validTokens[token]) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }
  next();
};

// 문제 3: 관리자 권한 확인 미들웨어 완성하기
// 사용자의 역할이 'admin'인지 확인
const adminOnly = (req, res, next) => {
  // TODO:
  // 1. req.headers의 'authorization' 헤더에서 토큰 추출
  //    (위와 같은 방식으로 'Bearer ' 이후의 문자열을 토큰으로 추출)
  // 2. 토큰이 없으면 401 상태 코드와 함께 { message: '인증이 필요합니다.' } 응답
  // 3. validTokens 객체에서 해당 토큰의 사용자 정보 조회
  // 4. 해당 토큰의 role이 'admin'인지 확인
  // 5. 'admin'이 아니면 403 상태 코드와 함께 { message: '접근 권한이 없습니다.' } 응답
  // 6. 'admin'이면 next() 호출
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  // 이상은 위임한다.
  if (validTokens[token].role !== "admin") {
    res.status(403).json({ message: "접근 권한이 없습니다." });
    return;
  }
  next();
};

// 모든 요청에 로깅 미들웨어 적용
app.use(logger);

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "환영합니다! API 서버에 접속하셨습니다." });
});

// 인증이 필요한 게시글 목록 조회 라우트
app.get("/posts", authentication, (req, res) => {
  // 헤더에서 토큰 추출
  const token = req.headers.authorization.split(" ")[1];
  const user = validTokens[token];

  res.json({
    success: true,
    username: user.username,
    data: posts,
  });
});

// 관리자만 접근 가능한 통계 정보 조회 라우트
app.get("/stats", authentication, adminOnly, (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: 2,
      totalPosts: posts.length,
      activeUsers: 2,
    },
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log(`서버가 http://localhost:3000 에서 실행 중입니다.`);
});
