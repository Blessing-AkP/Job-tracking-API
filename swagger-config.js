const path = require('path');

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jobs API',
      version: '1.0.0',
      description: 'Jobs API documentation',
    },
    servers: [
      {
        url: `https://relieved-bonnet-slug.cyclic.cloud/api/v1`,
      },
    ],
    // Reference your existing YAML file here
    components: {
      schemas: {},
    },
  },
  apis: [path.resolve(__dirname, 'openapi.yaml')],
  
};
