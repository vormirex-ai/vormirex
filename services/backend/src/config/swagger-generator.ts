import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Vormirex API Documentation',
    version: '1.0.0',
    description: 'Auto-detected API endpoints for the Vormirex learning platform.',
  },
  servers: [
    {
      url: '/',
      description: 'Default (Relative to current host)'
    },
    {
      url: 'http://localhost:3060',
      description: 'Nginx Proxy Server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Direct Backend Server'
    }
  ],
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your JWT token as: Bearer <token>',
    },
  },
};

const outputFile = './src/config/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

const run = async () => {
  // Use openapi: '3.0.0' option to generate v3 documentation
  await swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
};

run();
