import supertest from 'supertest';
import chai from 'chai';
import app from '../index';

const request = supertest(app);
const expect = chai.expect;

const productId = {
    valid: '15001003',
    invalid: '14001003',
};

describe('Product API tests', function () {
    describe('[GET] /products/:id', () => {
        it('It should fetch existing asset', (done) => {
            request
                .get(`/products/${productId.valid}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data.model).to.be.an('object');
                    done(err);
                });
        });
        it('It should not fetch non-existing asset', (done) => {
            request
                .get(`/products/${productId.invalid}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.data).to.be.a('undefined');
                    done(err);
                });
        });
    });

    describe('[GET] /products/price/:id', () => {
        it('It should fetch price of existing asset', (done) => {
            request
                .get(`/products/price/${productId.valid}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data.productId).to.be.a('string');
                    expect(res.body.data.price).to.be.a('string');
                    expect(res.body.data.currency).to.be.a('string');
                    done(err);
                });
        });
        it('It should not fetch price of non-existing asset', (done) => {
            request
                .get(`/products/price/${productId.invalid}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.be.a('string');
                    done(err);
                });
        });
    });

    describe('[GET] /products/price/:id', () => {
        it('It should update price of existing asset (valid params)', (done) => {
            request
                .put(`/products/price/${productId.valid}`)
                .send({ price: '49999', currency: 'INR' })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.data.productId).to.be.a('string');
                    expect(res.body.data.price).to.be.a('string');
                    expect(res.body.data.currency).to.be.a('string');
                    done(err);
                });
        });
        it('It should throw error if price is not specified', (done) => {
            request
                .get(`/products/price/${productId.invalid}`)
                .send({ prices: '49888', currency: 'INR' })
                .expect(200)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.be.a('string');
                    done(err);
                });
        });
    });
});
