import { Request, Response } from 'express';
import Redsky from '../core/services/Redsky';
class RedskyController {
    private source: Redsky;
    constructor() {
        this.source = new Redsky();
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const product = this.source.fetch(req.params.id);
            if (Object.keys(this.source).length > 0 || product) {
                res.status(200).send({
                    success: true,
                    data: product,
                });
            } else {
                throw Error('No Data Fetched');
            }
        } catch (err) {
            res.status(200).send({
                success: false,
                message: err.message,
            });
        }
    }
}

export default RedskyController;
