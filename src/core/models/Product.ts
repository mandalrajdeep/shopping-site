import { IPrice } from '../interfaces/Price';

class ProductModel {
    private model;

    constructor(model: IPrice) {
        this.model = model;
    }

    get productId() {
        return this.model.product._id;
    }

    get name() {
        return this.model.product.name;
    }

    get brand() {
        return this.model.product.brand;
    }

    get details() {
        return this.model.product.details;
    }

    get price() {
        return this.model.price;
    }

    get currency() {
        return this.model.currency;
    }

    set price(args) {
        console.log(args);
        const { price, currency } = args;
        this.model.price = price;
        this.model.currency = currency;
        this.model.updatedAt = new Date();
        this.model.save();
    }

    get updatedAt(): Date {
        return this.model.updatedAt;
    }
}

export default ProductModel;
