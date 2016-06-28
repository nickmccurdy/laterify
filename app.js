var koa = require('koa')
var app = koa()
app.use(require('koa-static')('public'));
app.listen(3000)
