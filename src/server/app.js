import Koa from 'koa';
import serve from 'koa-static';
import log4js from 'log4js';
import koaBody from 'koa-body';
import config from './config/index'
import path from 'path'
import IndexController from './controller/IndexController'
import koaSession from "koa-session"


const app = new Koa();
app.keys = ['bfftodos'];
const CONFIG = {
    key: 'bfftodos',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};

app.use(koaSession(CONFIG, app));
app.use(koaBody());
// 错误日志记录
log4js.configure({
    appenders: {
        globallog: {
            type: 'file',
            filename: './logs/globallog.log'
        }
    },
    categories: {
        default: {
            appenders: ['globallog'],
            level: 'debug'
        }
    }
});

// 异常处理
// const logger = log4js.getLogger('globallog');
// ErrorHander.init(app, logger);


// 初始化路由
IndexController.init(app);




// 静态资源目录
app.use(serve(path.resolve(__dirname, "./web")));

module.exports = app.listen(config.port, function () {
    console.log(`server is running at : http://localhost:${config.port}`);
});
