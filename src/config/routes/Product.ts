import express from 'express';
import ProductController from '../../controller/Product';

class ProductRoute {
    private productController: ProductController;

    public constructor() {
        this.productController = new ProductController();
    }

    get routes() {
        const router = express.Router();
        router.get(
            '/price/:id',
            this.productController.getPrice.bind(this.productController),
        );
        router.get(
            '/:id',
            this.productController.getProduct.bind(this.productController),
        );
        router.put(
            '/price/:id',
            this.productController.updatePrice.bind(this.productController),
        );
        return router;
    }
}

Object.seal(ProductRoute);
export = ProductRoute;
