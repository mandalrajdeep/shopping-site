import express from 'express';
import Connector from './config/db/Connector';
import Middleware from './config/middleware/Express';

class App {
    private app: express.Application;

    private middleware: Middleware;

    private port: any;

    private db: Connector;

    public constructor() {
        this.middleware = new Middleware();
        this.db = new Connector(process.env.DB_URI);
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10) || 8080;
    }

    public run() {
        this.db.connect();
        this.app.use(this.middleware.configuration.bind(this.middleware));
        this.app.listen(this.port, () => {
            console.log('The app is running on port ', this.port);
        });
    }
}

export default App;
