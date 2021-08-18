import Router from 'koa-router';
import fs from 'fs'
import path from "path";
const router = new Router()

router.get("/", ctx => {
    const file = fs.readFileSync(path.resolve(__dirname, "../web/index.html"));
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = file;
})

export default {
    init (app) {
        app.use(router.routes()).use(router.allowedMethods());
    }
};
