const Koa = require('koa');
// const Path = require('path');
// const bodyParser = require('koa-bodyparser');

const PathRouterMiddleware = require('../middlewares/pathRouter');

class Service {
    constructor() {
        this.init();
        this.options = { ...Service.DEFAULT };
        // this.initMiddleware();
    }

    init() {
        this.koa = new Koa();
        const router = new PathRouterMiddleware();
        this.koa.use(router.getRoutes());
    }

    start() {
        let port = process.env.PORT || this.options.port;
        this.koa.listen(port, () => {
            console.log(`start success: ${port}`);
        });
    }
}
Service.DEFAULT = {
    rootPath: process.env.ROOT_PATH,
    static: 'public',
    logPath: 'logs',
    config: 'config',
    pathRouter: 'controller',
    templatePath: 'template',
    // bodyparser: true,
    port: 8000,
};
module.exports = Service;
