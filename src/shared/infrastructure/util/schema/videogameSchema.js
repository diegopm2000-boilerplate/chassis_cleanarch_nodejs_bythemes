// gamesystemSchema.js

exports.schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 45 },
    name: { type: 'string', maxLength: 45 },
    developer: { type: 'string', maxLength: 45 },
    genre: { type: 'string', maxLength: 45 },
    year: { type: 'integer' },
    gamesystemId: { type: 'string', maxLength: 45 },
  },
  required: ['id', 'name', 'developer', 'genre', 'year', 'gamesystemId'],
  additionalProperties: false,
};
