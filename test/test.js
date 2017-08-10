var request = require('supertest');
var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = require('chai').expect;
var app = require('../server.js');

chai.use(chaiHttp);


it('should not serve the login page since we it doesn\'t exist', (done) => {
  chai.request(app)
  .get('/login')
  .end((err, res) => {
    res.should.have.status(404);
    done();
  });
});
