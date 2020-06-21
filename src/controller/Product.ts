import { Request, Response } from 'express';
import { Types } from 'mongoose';
import IPriceDocument, { IPrice } from '../core/interfaces/Price';
import IProductDocument, { IProduct } from '../core/interfaces/Product';
import PriceSchema from '../core/schemas/Price';
import ProductSchema from '../core/schemas/Product';
import ProductModel from '../core/models/Product';
import Repository from '../core/services/Repository';

class ProductController {
    private repository: {
        price: Repository<IPriceDocument, IPrice>;
        product: Repository<IProductDocument, IProduct>;
    };

    constructor() {
        this.repository = {
            product: new Repository<IProductDocument, IProduct>(ProductSchema),
            price: new Repository<IPriceDocument, IPrice>(
                PriceSchema,
                'product',
            ),
        };
    }

    public async getProduct(req: Request, res: Response) {
        try {
            const product = await this.repository.product.findOne({
                id: req.params.id,
            });
            console.log(product['_id']);
            const content = new ProductModel(
                await this.repository.price.findOne({
                    product: Types.ObjectId(product['_id']),
                }),
            );
            res.status(200).send({
                success: true,
                data: content,
            });
        } catch (err) {
            res.status(200).send({
                success: false,
                message: 'Product Fetch Failed',
            });
        }
    }

    public async getPrice(req: Request, res: Response) {
        try {
            const product = await this.repository.product.findOne({
                id: req.params.id,
            });
            const content = new ProductModel(
                await this.repository.price.findOne({
                    product: Types.ObjectId(product['_id']),
                }),
            );
            res.status(200).send({
                success: true,
                data: {
                    productId: content.productId,
                    price: content.price,
                    currency: content.currency,
                },
            });
        } catch (err) {
            res.status(200).send({
                success: false,
                message: 'Product Fetch Failed',
            });
        }
    }

    public async updatePrice(req: Request, res: Response) {
        try {
            console.log(req.params.id, req.body);
            const product = await this.repository.product.findOne({
                id: req.params.id,
            });
            const content = new ProductModel(
                await this.repository.price.findOne({
                    product: Types.ObjectId(product['_id']),
                }),
            );
            content.price = {
                price: req.body.price,
                currency: req.body.currency || 'INR',
            };
            res.status(200).send({
                success: true,
                message: 'Price has updated',
                data: {
                    productId: content.productId,
                    price: content.price,
                    currency: content.currency,
                },
            });
        } catch (err) {
            res.status(200).send({
                success: false,
                message: 'Product Fetch Failed',
            });
        }
    }
}
export default ProductController;
