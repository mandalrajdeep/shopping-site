import supertest from 'supertest';
import chai from 'chai';
import app from '../index';

const request = supertest(app);
const expect = chai.expect;

const productId = {
    valid: '15001003',
    invalid: '14001003',
};

describe('Redsky API tests', function () {
    describe('[GET] /redsky/:id', () => {
        it('It should fetch existing asset', (done) => {
            request
                .get(`/redsky/${productId.valid}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.an('object');
                    done(err);
                });
        });
        it('It should not fetch non-existing asset', (done) => {
            request
                .get(`/redsky/${productId.invalid}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false);
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.data).to.be.a('undefined');
                    done(err);
                });
        });
    });
});
