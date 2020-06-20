import express from 'express';
import Product from './Product';
import Redsky from './Redsky';

class BaseRoutes {
    private products: Product;

    private redsky: Redsky;

    public constructor() {
        this.products = new Product();
        this.redsky = new Redsky();
    }

    public get routes() {
        const app = express();
        app.use('/products', this.products.routes.bind(this.products));
        app.use('/orgs', this.redsky.routes.bind(this.redsky));
        return app;
    }
}
export default BaseRoutes;
