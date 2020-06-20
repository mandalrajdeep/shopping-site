import { IPrice } from '../interfaces/Price';

class OpenOwner {
    private model;

    constructor(model: IPrice) {
        this.model.productId = model.product;
        this.model.name = model.product.name;
        this.model.brand = model.product.brand;
        this.model.details = model.product.details;
        this.model.price = model.price;
        this.model.currency = model.currency;
        this.model.updatedAt = model.updatedAt;
    }

    get productId() {
        return this.model.productId;
    }

    get name() {
        return this.model.name;
    }

    get brand() {
        return this.model.brand;
    }

    get details() {
        return this.model.details;
    }

    get price() {
        return this.model.price;
    }

    get currency() {
        return this.model.currency;
    }

    set price(args) {
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

export default OpenOwner;
