const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')

const api = supertest('http://localhost:3000')

describe('GET /index', function(){
    //test
        it('should return a 200 response', function(done){
            api
            .get("/")
            .set('Accept', 'application/json')
            .expect(200, done)
        })
    
        it('should return an object', function(done){
            api
            .get('/')
            .set('Accept', "application/json")
            .end(function(error, response){
              expect(response.body).to.be.an('object');
              done()
            })
        })
    
        it('should have more than one book', function(done){
            api
            .get('/')
            .set('Accept', "application/json")
            .end(function(error, response){
              expect(response.body.length).to.be.greaterThan(0);
              done()
            })
        })
    })