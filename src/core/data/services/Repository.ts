import { Types, Document, Model } from 'mongoose';

class Repository<T extends Document, P> {
    private schema: Model<T>;

    private populate: string;

    constructor(schema: Model<T>, populate: string = '') {
        this.schema = schema;
        this.populate = populate;
    }

    public async findById(_id: Types.ObjectId) {
        return (await this.schema
            .findById(_id)
            .populate(this.populate)
            .exec()) as T;
    }

    public async findOne(query: object) {
        return (await this.schema
            .findOne(query)
            .populate(this.populate)
            .exec()) as T;
    }

    public async retrieve(query: object) {
        return (await this.schema
            .find(query)
            .sort({ _id: -1 })
            .limit(100)
            .populate(this.populate)
            .exec()) as T[];
    }

    public async create(item: P) {
        const data = await this.schema.create(item);
        return (await data.populate(this.populate).execPopulate()) as T;
    }

    public async delete(query: object) {
        await this.schema.deleteOne(query || {});
    }

    public async updateOne(findQuery: object, updateQuery: object) {
        return (await this.schema.findOneAndUpdate(
            findQuery,
            updateQuery,
        )) as T;
    }

    public async updateMany(findQuery: object, updateQuery: object) {
        return (await this.schema.updateMany(findQuery, updateQuery)) as T;
    }
}
export default Repository;
