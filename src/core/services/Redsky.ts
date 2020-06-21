import fs from 'fs';
import path from 'path';

class Redsky {
    private file: string;

    private map: {};

    constructor() {
        this.file = path.join(__dirname, '../../redsky.json');
        this.map = {};
        this.init();
    }

    private init() {
        const products = JSON.parse(fs.readFileSync(this.file).toString());
        for (const product in products) {
            const key = product['product']['item']['tcin'];
            if (key && !this.map[key]) {
                this.map[key] = product[key]['product'];
            }
        }
    }

    public async fetch(key: string) {
        if (!this.map[key]) {
            throw Error('Product Not Available');
        }
        return this.map[key];
    }
}

export default Redsky;
