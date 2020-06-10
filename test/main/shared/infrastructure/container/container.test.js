// container.test.js

/* eslint-disable global-require */

/* global describe, it */

const { expect } = require('chai');
// const sinon = require('sinon');

const expectations = require('../../../../expectations/expectations');

const container = require('../../../../../src/shared/infrastructure/container/container');

const logColorLogger = require('../../../../../src/shared/infrastructure/log/logColorLogger');
const consoleLogger = require('../../../../../src/shared/infrastructure/log/consoleLogger');

describe('Container Infra - Tests', () => {
  describe('getConfig & setConfig - Successfully CASE', () => {
    it('getConfig & setConfig - Successfully CASE', () => {
      // Params IN
      const data = expectations.defaultObj;
      // Expected Result
      const expectedResult = expectations.defaultObj;

      // Launch op
      container.setConfig(data);
      const result = container.getConfig();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('init container & get module - Successfully CASE', () => {
    it('init container & get module - Successfully CASE', async () => {
      // Params IN
      const moduleName = 'logger';
      // Expected Result
      const expectedResult = logColorLogger;
      // Launch Operations
      container.init();
      const result = container.get(moduleName);
      expect(result).to.equal(expectedResult);
    });
  });
  describe('defaultInit container - Successfully CASE', () => {
    it('defaultInit container - Successfully CASE', async () => {
      // Params IN
      const moduleName = 'logger';
      // Expected Result
      const expectedResult = consoleLogger;
      // Launch Operations
      container.defaultInit();
      const result = container.get(moduleName);
      expect(result).to.equal(expectedResult);
    });
  });
  describe('getLogger - Successfully CASE', () => {
    it('getLogger - Successfully CASE', async () => {
      // Params IN
      // No params
      // Expected Result
      const expectedResult = logColorLogger;
      // Launch Operations
      container.init();
      const result = container.getLogger();
      expect(result).to.equal(expectedResult);
    });
  });
});
