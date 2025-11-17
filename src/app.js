import express from "express";

const app = express();

app.use(express.json());

// 임시 사용자 데이터
const users = [
  { id: 1, name: "김철수", age: 25 },
  { id: 2, name: "이영희", age: 28 },
  { id: 3, name: "박민수", age: 22 },
];

// 문제 1: GET /users 엔드포인트 완성하기
// 쿼리 파라미터로 minAge를 받아서 해당 나이 이상의 사용자만 반환
// 쿼리 파라미터가 없으면 모든 사용자 반환
app.get("/users", (req, res) => {
  // TODO: minAge 값을 가져오고
  // 해당 나이 이상의 사용자만 필터링하여 반환하세요
  const { minAge } = req.query;

  if (minAge) {
    const parsedMinAge = +minAge;
    // if (isNaN(parsedMinAge)) {
    //   res.status(400).json({ message: "minAge는 숫자여야 합니다." });
    //   return;
    // }
    const filteredUsers = users.filter((user) => user.age >= parsedMinAge);
    res.json(filteredUsers);
    return;
  }
  res.json(users);
});

// 문제 2: GET /users/:id 엔드포인트 완성하기
// URL 파라미터로 받은 id와 일치하는 사용자 정보 반환
// 해당 id의 사용자가 없으면 404 상태 코드와 에러 메시지 반환
app.get("/users/:id", (req, res) => {
  // TODO: id 값을 가져오고
  // 해당 id의 사용자를 찾아 반환하세요
  // 사용자가 없으면 404 상태 코드와 에러 메시지 반환
  const userId = +req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res
      .status(404)
      .json({ message: `ID가 ${userId}인 사용자를 찾을 수 없습니다.` });
    return;
  }
  res.json(user);
});

// 문제 3: POST /users 엔드포인트 완성하기
// 요청 본문으로 받은 name과 age로 새 사용자 생성하여 추가
// name이나 age가 없으면 400 상태 코드와 에러 메시지 반환
app.post("/users", (req, res) => {
  // TODO: name과 age를 가져와 새 사용자 생성
  // name이나 age가 없으면 400 상태 코드와 에러 메시지 반환
  // 새 사용자를 users 배열에 추가하고 201 상태 코드와 함께 생성된 사용자 정보 반환
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(400).json({ message: "이름과 나이를 모두 입력해주세요." });
    return;
  }

  // 새 사용자 ID 생성 (가장 큰 ID + 1)
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = {
    id: newId,
    name,
    age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// 문제 4: PATCH /users/:id 엔드포인트 완성하기
// URL 파라미터로 받은 id의 사용자 정보를 요청 본문 내용으로 업데이트
// 해당 id의 사용자가 없으면 404 상태 코드와 에러 메시지 반환
app.patch("/users/:id", (req, res) => {
  // TODO: id를 가져오고 req.body에서 업데이트할 내용 가져오기
  // 해당 id의 사용자가 없으면 404 상태 코드와 에러 메시지 반환
  // 사용자 정보 업데이트 후 업데이트된 사용자 정보 반환
  const userId = +req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res
      .status(404)
      .json({ message: `ID가 ${userId}인 사용자를 찾을 수 없습니다.` });
    return;
  }
  const { name, age } = req.body;
  if (!name && !age) {
    res.status(400).json({ message: "이름과 나이를 모두 입력해주세요." });
    return;
  }

  user.name = name || user.name;
  user.age = age || user.age;

  console.log("users", users);
  res.status(201).json(user);
});

// 서버 시작
app.listen(3000, () => {
  console.log(`서버가 http://localhost:3000 에서 실행 중입니다.`);
});
