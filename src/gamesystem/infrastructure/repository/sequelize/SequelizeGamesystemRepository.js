// SequelizeGamesystemRepository.js

const GamesystemRepository = require('../../../adapter/repository/GamesystemRepository');

class SequelizeGamesystemRepository extends GamesystemRepository {
  constructor(args) {
    super(args);
    this.model = args.model;
    this.sequelizeCRUDRepository = args.sequelizeCRUDRepository;
  }

  async getAll() {
    return this.sequelizeCRUDRepository.getAll(this.model);
  }

  async getById(id) {
    return this.sequelizeCRUDRepository.getById(this.model, id);
  }

  async getByFilter(filter) {
    return this.sequelizeCRUDRepository.getByFilter(this.model, filter);
  }

  async create(newObj) {
    return this.sequelizeCRUDRepository.create(this.model, newObj);
  }

  async update(id, data) {
    return this.sequelizeCRUDRepository.update(this.model, id, data);
  }

  async remove(id) {
    return this.sequelizeCRUDRepository.remove(this.model, id);
  }
}

module.exports = SequelizeGamesystemRepository;
