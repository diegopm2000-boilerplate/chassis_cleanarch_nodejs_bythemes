// gamesystemSchema.js

exports.schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 45 },
    name: { type: 'string', maxLength: 45 },
    description: { type: 'string', maxLength: 45 },
  },
  required: ['id', 'name', 'description'],
  additionalProperties: false,
};
