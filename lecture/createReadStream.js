const fs = require("fs");

// 16Byte 단위로 chuk 쪼개기. 기본은 64KByte
const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });

const data = [];

// chunk 로 나누어서 스트리밍, chunk 단위로 끊어서 다 읽을때까지 반복
readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data: ", chunk, chunk.length);
});

// chunk 모아주기
readStream.on("end", () => {
  console.log("end: ", Buffer.concat(data).toString());
});

// 에러 처리, createReadStream 은 비동기 함수
readStream.on("error", (err) => {
  console.log("error: ", err);
});
