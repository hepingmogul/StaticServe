'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 静态资源服务

// const Pug = require('koa-pug');
// koa web 服务框架
const path = require('path'); // 支持跨域中间件

const fs = require('fs');
const util = require('util');
const os = require('os');

const networkInterfaces = os.networkInterfaces();

const app = new _koa2.default();

// 支持代理
app.proxy = true;

// 支持跨域
app.use((0, _koaCors2.default)());

// 静态文件，默认响应
app.use((0, _koaStatic2.default)(path.join(__dirname, '../public')));

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
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '127.0.0.1';

  console.log(`koa start on port: http://${host}:${port}`);
  console.log(`koa start on port: http://${getip()}:${port}`);

  return new Promise((resolve, reject) => app.listen(port, host, resolve).on('error', reject));
}

// 启动服务
main().catch(err => setImmediate(() => {
  throw err;
}));