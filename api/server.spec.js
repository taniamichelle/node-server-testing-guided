const request = require('supertest'); //import supertest library

const server = require('./server'); //import server file

//'describe' organizes the way the output is displayed
describe('server.js', () => {
    describe('GET /', () => {
        it('returns 200 OK', () => {
            //return a GET request to the '/' endpoint on the server
            return request(server)
                .get('/')
                .then(res => {
                    //assert that we get an http status code of 200 when passing valid creds
                    expect(res.status).toBe(200);
                });
        });
        //'async/await' is the second way of telling jest to wait
        it("should return {api: 'up'}", async () => {
            const res = await request(server).get('/');
            expect(res.body.api).toBe('up');
            expect(res.body).toEqual({ api: 'up' });
        });
        //'done' is the third way of telling jest to wait for a server response before running test
        it('returns JSON', done => {
            request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    done();
                });
        });
    });
});
