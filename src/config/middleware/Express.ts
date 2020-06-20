import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import BaseRoutes from '../routes/Base';
import SecureConnection from './SecureConnection';

class Middleware {
    private base: BaseRoutes;

    private ssl: SecureConnection;

    public constructor() {
        this.base = new BaseRoutes();
        this.ssl = new SecureConnection();
    }

    public get configuration() {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use(this.ssl.isSecure.bind(this.ssl));
        app.use(this.base.routes.bind(this.base));
        return app;
    }
}
Object.seal(Middleware);
export default Middleware;
