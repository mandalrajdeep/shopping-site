import { Document } from 'mongoose';
import { IProduct } from 'mongoose';
export interface IPrice {
    product: IProduct;
    price: string;
    currency: string;
    updatedAt: Date;
}

export default interface IPriceDocument extends Document, IPrice {}
