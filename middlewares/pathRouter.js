const Fs = require('fs');
const Path = require('path');
const KoaRouter = require('koa-router');
class PathRouter {
    constructor() {
        this.router = async (ctx) => {
            await this.handle(ctx);
        };
    }

    async handle(ctx) {
        // const url = ctx.request.url;
        ctx.body = ctx;
    }

    route(ctx) {
        let urlPath = ctx.request.path.replace(/\/$/, '');

    }

    getControllerAction(url) {

    }

    getRoutes() {
        return this.router;
    }
}

module.exports = PathRouter;