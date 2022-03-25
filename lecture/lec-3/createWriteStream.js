const fs = require("fs");

const writeStream = fs.createWriteStream("./writeme2.txt");

// 스트림으로 write 모두 완료 되었을 때
writeStream.on("finish", () => {
  console.log("파일쓰기 완료");
});

// write 하나 당 하나의 버퍼에 씀
writeStream.write("이 글을 씁니다.\n");
writeStream.write("한번 더 씁니다.");
writeStream.end(); // 완료
