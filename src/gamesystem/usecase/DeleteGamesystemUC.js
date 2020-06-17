// deleteGamesystemUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class DeleteGamesystemUC extends BaseUC {
  async execute(params) {
    super.logIn(`params: ${JSON.stringify(params)}`);

    // Business IN parameters
    const { gamesystemId: id } = params;

    // Check if exist the gamesystem
    const gamesystemFound = await this.repository.getById(id);
    if (!gamesystemFound) {
      return this.presenter.presentObjectNotFound(this.constructor.name, this.logger);
    }

    const wasDeleted = await this.repository.remove(id);
    super.logMid(`wasDeleted: ${JSON.stringify(wasDeleted)}`);

    // Return result
    return super.presentResultOfDeletion(wasDeleted);
  }
}

module.exports = DeleteGamesystemUC;
