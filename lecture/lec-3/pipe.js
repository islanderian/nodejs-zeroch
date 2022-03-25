const fs = require("fs");
const zlib = require("zlib"); // 압축하기 위한 library

const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("./writeme3.txt.gz");
const zlibStream = zlib.createGunzip();

// readStream 파일을 압축해서 writeStream 으로 연결
readStream.pipe(zlibStream).pipe(writeStream);
