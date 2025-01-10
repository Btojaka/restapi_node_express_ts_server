import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / Typescript Documentation",
      version: "1.0.0",
      description: "API Documentation for the project:",
      contact: {
        name: "Btojaka",
        url: "https://github.com/Btojaka/restapi_node_express_ts_server",
      },
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .topbar-wrapper .link {
            display: none !important; /* Ocultar el logo SVG de Swagger */
        }
        .topbar-wrapper  {
            background-image: url('/assets/logosinFondo.png');
            background-color: #fff;
            background-size: contain;
            background-repeat: no-repeat;
            height: 60px;
            width: 80px;
        }
        
    `,
  customSiteTitle: "Documentation REST API Express / TypeScript",
};
export default swaggerSpec;
export { swaggerUiOptions };
