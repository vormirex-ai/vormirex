import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';

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
  
  // Read generated JSON and wrap into a TypeScript module for ESM compatibility (Vercel & Jest)
  if (fs.existsSync(outputFile)) {
    const jsonContent = fs.readFileSync(outputFile, 'utf8');
    const tsContent = `// Auto-generated Swagger spec. Do not edit directly.\nexport default ${jsonContent};\n`;
    fs.writeFileSync('./src/config/swagger-output.ts', tsContent, 'utf8');
  }
};

run();
