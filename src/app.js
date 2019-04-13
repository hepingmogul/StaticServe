import Koa from 'koa'; // koa web 服务框架
import cors from 'koa-cors'; // 支持跨域中间件
import staticFile from 'koa-static'; // 静态资源服务

const Pug = require('koa-pug');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = new Koa();

// 支持代理
app.proxy = true;

// 支持跨域
app.use(cors());

// 静态文件，默认响应
app.use(staticFile(path.join(__dirname, '../public')));