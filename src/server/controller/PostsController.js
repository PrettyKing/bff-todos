
import fs from 'fs'
import path from "path";
import Router from 'koa-router';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
const router = new Router()



router.get('/api', async ctx => {
    let data = ''
    try {
        data = await PostMessage.find();
    } catch (error) {
        data = error
    }
    ctx.body = data
});

router.post('/api', async ctx => {
    let data = ''
    const { title, message, selectedFile, creator, tags } = ctx.request.body;
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();
        data = newPostMessage;
    } catch (error) {
        data = error
    }
    ctx.body = data
});

router.get('/api/:id', async ctx => {
    let data = ''
    let id = ctx.params.id
    try {
        data = await PostMessage.findById(id);
    } catch (error) {
        data = error
    }
    ctx.body = data
});

router.patch('/api/:id', async ctx => {
    const { id } = ctx.params;
    const { title, message, creator, selectedFile, tags } = ctx.request.body;
    if (!mongoose.Types.ObjectId.isValid(id)) ctx.body = "id 错误";

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    ctx.body = updatedPost
});

router.delete('/api/:id', async ctx => {
    const { id } = ctx.params;

    if (!mongoose.Types.ObjectId.isValid(id)) ctx.body = "没有这个ID";

    await PostMessage.findByIdAndRemove(id);

    ctx.body = {
        data: '删除成功'
    }
});


router.patch('/api/:id/likePost', async ctx => {
    const { id } = ctx.params;

    if (!mongoose.Types.ObjectId.isValid(id)) ctx.body = "没有这个ID";

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    ctx.body = updatedPost
});


router.get("/", async (ctx) => {
    const file = fs.readFileSync(path.resolve(__dirname, "../web/index.html"));
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = file;
})

export default {
    init (app) {
        app.use(router.routes()).use(router.allowedMethods());
    }
};

