const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

//--- 포트 설정
app.set("port", process.env.PORT || 3000); // 포트설정

//--- 공통 미들웨어
app.use(morgan("dev")); // 서버 정보 기록. "dev" 또는 "combined"
app.use(cookieParser()); // 쿠키 설정들이 편해짐

//--- 라우터들
app.get("/", (req, res) => {
  req.cookies; // {mycookie: "test"}

  res.cookie("name", encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: "/",
  });
  // 쿠키 삭제
  res.clearCookie("name", encodeURIComponent(name), {
    httpOnly: true,
    path: "/",
  });

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

//--- 404 처리 미들웨어
// 라우터에 명시되지 않은 라우터는 404이므로
app.use((req, res, next) => {
  res.status(404).send("404 에러러러");
});

//--- 에러 미들웨어
// 에러 미들웨어는 err,req,res,next 매개변수를 모두 인자로 전달해야 함.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("에러났지롱. 근데 안 알려주지롱"); // 에러 났을 때 메시지를 숨기고, 사용자들에게 해당 화면 표시
});

//--- 해당포트에서 서버 실행
app.listen(app.get("port"), () => {
  console.log("익스프레스 서버 실행");
});
