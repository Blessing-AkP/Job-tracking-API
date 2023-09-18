const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger JSDoc options based on your Swagger YAML file
const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the version of Swagger/OpenAPI spec
    info: {
      title: 'Jobs API',
      version: '1.0.0',
      description: 'Jobs API documentation',
    },
  },
  apis: ['./swagger.yaml'], // Replace with the path to your Swagger YAML file
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // Serve Swagger documentation using Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
