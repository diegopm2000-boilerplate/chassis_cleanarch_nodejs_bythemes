// deleteGamesystemUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class DeleteGamesystemUC extends BaseUC {
  async execute(params) {
    super.logIn(this.constructor.name, params);

    // Business IN parameters
    const { gamesystemId: id } = params;

    // Check if exist the gamesystem
    const gamesystemFound = await this.repository.getById(id);
    if (!gamesystemFound) {
      return this.presenter.presentObjectNotFound(this.constructor.name, this.logger);
    }

    const wasDeleted = await this.repository.remove(id);
    this.logger.debug(`${this.constructor.name} (MID) --> wasDeleted: ${JSON.stringify(wasDeleted)}`);

    // Return result
    return this.presenter.presentResultOfDeletion(this.constructor.name, this.logger, wasDeleted);
  }
}

module.exports = DeleteGamesystemUC;
