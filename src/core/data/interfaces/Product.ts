import { Document } from 'mongoose';

export interface IProduct {
    id: string;
    name: string;
    brand: string;
    details: {};
    updatedAt: Date;
}

export default interface IProductDocument extends Document, IProduct {}
