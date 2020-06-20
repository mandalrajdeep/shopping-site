import { Schema, model } from 'mongoose';
import IProductDocument from '../interfaces/Product';

class ProductSchema {
    static get schema() {
        const ProductSchema = new Schema({
            id: String,
            name: String,
            brand: String,
            details: {},
            updatedAt: {
                type: Date,
                required: true,
                default: new Date(),
            },
        });
        return ProductSchema;
    }
}
const schema = model<IProductDocument>('Configurations', ProductSchema.schema);
export default schema;
