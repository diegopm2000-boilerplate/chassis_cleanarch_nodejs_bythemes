// getConfigUC.test.js

/* global describe, it */

const { expect } = require('chai');

// Main module tested
const getConfigUC = require('../../../../src/config/usecase/getConfigUC');

const expectations = require('../../../expectations/expectations');

// Mocks
const repository = require('../../../mock/config/infrastructure/repository/configRepository.mock');
const logger = require('../../../mock/shared/infrastructure/log/logger.mock');
const presenter = require('../../../mock/config/adapter/presenter/presenter.mock');

describe('getConfigUC - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('execute - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfilename.yml';
      // Expected Result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await getConfigUC.execute(repository, presenter, logger, filename);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
