import express from 'express';
import RedskyController from '../../controller/Redsky';

class RedskyRoute {
    private redskyController: RedskyController;

    public constructor() {
        this.redskyController = new RedskyController();
    }

    get routes() {
        const router = express.Router();

        router.get(
            '/:id',
            this.redskyController.getProduct.bind(this.redskyController),
        );
        return router;
    }
}

Object.seal(RedskyRoute);
export = RedskyRoute;
