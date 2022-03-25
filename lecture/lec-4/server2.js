const http = require("http");
const fs = require("fs").promises;

const server = http
  .createServer(async (req, res) => {
    try {
      res.writeHead(200, { "Content-type": "text/html; charset=utf-8" }); // 브라우저에 html 문서이며 한글표시를 위한 utf-8 을 알려줌
      const data = await fs.readFile("./server2.html");
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
      res.end(error.message);
    }
  })
  .listen(8080); // 8080 포트에서

server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다.");
});
// error 처리
server.on("error", (error) => {
  console.error(error);
});
