import { Schema, Types, model } from 'mongoose';
import IPriceDocument from '../interfaces/Price';

class PriceSchema {
    static get schema() {
        const PriceSchema = new Schema({
            product: {
                type: Types.ObjectId,
                ref: 'Products',
            },
            price: String,
            currency: String,
            updatedAt: {
                type: Date,
                required: true,
                default: new Date(),
            },
        });
        return PriceSchema;
    }
}
const schema = model<IPriceDocument>('Prices', PriceSchema.schema);
export default schema;
