import Koa from 'koa'; // koa web 服务框架
import cors from 'koa-cors'; // 支持跨域中间件
import staticFile from 'koa-static'; // 静态资源服务

// const Pug = require('koa-pug');
const path = require('path');
const fs = require('fs');
const util = require('util');
const os = require('os');

const networkInterfaces = os.networkInterfaces();

const app = new Koa();

// 支持代理
app.proxy = true;

// 支持跨域
app.use(cors());

// 静态文件，默认响应
// app.use(staticFile(path.join(__dirname, '../public')));
// app.use(staticFile('F:/test/bootstrap-admin'));
// app.use(staticFile('F:/songTech/face_spread/dist'));
app.use(staticFile('F:/test/tietaceshi/'));

// 获取本机IP
function getip() {
  let ip = null;
  for (const k in networkInterfaces) {
    networkInterfaces[k].forEach(v => {
      if (v.family === 'IPv4' && v.address !== '127.0.0.1' && !v.internal) ip = v.address;
    });
  }
  return ip;
}

async function main() {
  const port = /* process.env.PORT || */ 3032
  const host = process.env.HOST || '';

  console.log(`koa start on port: http://127.0.0.1:${port}`);
  console.log(`koa start on port: http://${getip()}:${port}`);

  return new Promise((resolve, reject) => app.listen(port, host, resolve).on('error', reject));
}

// 启动服务
main().catch(err => setImmediate(() => { throw err; }));

