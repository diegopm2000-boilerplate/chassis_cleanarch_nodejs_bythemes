// getConfigController.test.js

/* global describe, it, before, after */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { expect } = require('chai');
const sinon = require('sinon');

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

// Expectations
const expectations = require('../../../../expectations/expectations');

// Main module tested
const getConfigController = rewire('../../../../../src/config/infrastructure/controller/getConfigController');

// Mocks
const containerMock = require('../../../../mock/shared/infrastructure/container/container.mock');

getConfigController.__set__('container', containerMock);

describe('getConfigController - Infrastructure - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('it - Successfully CASE', async () => {
      // IN params
      const req = new MockExpressRequest();
      const res = new MockExpressResponse();
      // Expected Result
      const expectedResult = expectations.config;
      // Launch operation
      await getConfigController.execute(req, res);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
  describe('execute - Throw Error CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(containerMock.getLogger(), 'debug').throws(new Error('Error forced in testing'));
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });
    it('it - Throw Error CASE', async () => {
      // IN params
      const req = new MockExpressRequest();
      const res = new MockExpressResponse();
      const next = (error) => {
        res.status(500).json({ code: 500, message: error.message });
      };
      // Expected Result
      const expectedResult = { code: 500, message: 'Internal Error' };
      // Launch operation
      await getConfigController.execute(req, res, next);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
});
