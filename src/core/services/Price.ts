import { IOwner, IOwnerDocument, OwnerSchema } from '@sedemac/types';
import { Query, GeneralRepository } from '@sedemac/db-client';

class OwnerService {
    private service;

    constructor() {
        const repo = new GeneralRepository<IOwnerDocument, IOwner>(OwnerSchema);
        this.service = new Query('owner', repo);
    }

    public async findOne(ownerId) {
        return await this.service.findOne({ _id: ownerId });
    }

    public async updateOnAndroid(ownerId, arn: string) {
        const owner = await this.service.findOne({ _id: ownerId });
        owner.arn = { firebase: arn };
        return { update: 'success' };
    }

    public async updateOnWeb(ownerId, arn: string) {
        const owner = this.service.findOne({ _id: ownerId });
        owner.arn = { web: arn };
        return { update: 'success' };
    }
}

export default OwnerService;
