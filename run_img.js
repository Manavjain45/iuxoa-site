const fs = require('fs');
const b64 = fs.readFileSync('D:/Projects/IuXoa/1/img_data.txt', 'utf8').replace(/\n/g, '').trim();
const buf = Buffer.from(b64, 'base64');
fs.writeFileSync('D:/Projects/IuXoa/1/src/assets/team/team-group.jpg', buf);
fs.unlinkSync('D:/Projects/IuXoa/1/img_data.txt');
fs.unlinkSync('D:/Projects/IuXoa/1/run_img.js');
try { fs.unlinkSync('D:/Projects/IuXoa/1/save_img_temp.js'); } catch(e){}
console.log('Done! Saved', buf.length, 'bytes');
