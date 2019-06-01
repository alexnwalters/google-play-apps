const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Get /apps', () => {

    const attbs = ["App","Category", "Rating", "Reviews", 
    "Size", "Installs", "Type", "Price",
    "Content Rating", "Genres", "Last Updated", "Current Ver",
    "Android Ver"]

    it('should return array of books', () => {
        return request(app)
            .get('/apps')
            .query({sort:'' , genres:''})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const gogApp = res.body[0];
                expect(gogApp).to.include.all.keys(attbs);
            });
    });
});