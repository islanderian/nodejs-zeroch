const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000); // 포트설정

// 미들웨어
app.use((req, res, next) => {
  console.log("모든 요청에 실행하고 싶어요.");
  next(); // 다음 라우터 중 일치하는 것을 자동 실행
});

//--- 라우터들
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/", (req, res) => {
  res.send("hello express");
});
// 라우트 매개변수 사용 "/category/:name"
app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});
app.get("/about", (req, res) => {
  res.send("hello express");
});
//---

// 해당포트에서 서버 실행
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
