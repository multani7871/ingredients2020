var request = require('supertest');
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = require('chai').expect;
var app = require('../server');

chai.use(chaiHttp);

describe('Authentication', function() {
  describe('naive', function() {

    it('should not serve the ingredients page w/out authentication', (done) => {
      chai.request('http://localhost:8000')
      .get('/api/ingredients')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });

    it('should not serve the pastSearches page w/out authentication', (done) => {
      chai.request('http://localhost:8000')
      .get('/api/ingredients')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });

    it('should not serve the images page w/out authentication', (done) => {
      chai.request('http://localhost:8000')
      .get('/api/ingredients')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });

    });

    describe('todo: database tests in this block', function() {

    });

  });

});
