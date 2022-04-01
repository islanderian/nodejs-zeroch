const express = require("express");
const path = require("path");

const app = express();

//--- 포트 설정
app.set("port", process.env.PORT || 3000); // 포트설정

//--- 공통 미들웨어
app.use(
  (req, res, next) => {
    console.log("모든 요청에 실행하고 싶어요.");
    next(); // 다음 라우터 중 일치하는 것을 자동 실행
  },
  (req, res, next) => {
    try {
      console.log(dlkjlkfsd);
    } catch (err) {
      // next 에 인수가 있으면 바로 error 처리 미들웨어로 넘어감
      next(err);
    }
  }
);

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
