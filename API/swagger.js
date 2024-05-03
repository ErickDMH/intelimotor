import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Intelmotor API',
      version: '1.0.0',
      description: 'Intelmotor web scraping fullstack test.',
    },
    servers: [
      {
        url: 'http://localhost:4500',
      },
    ],
  },
  apis: [join(__dirname, '../API/*.js')],
}

const specs = swaggerJsdoc(options)

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
