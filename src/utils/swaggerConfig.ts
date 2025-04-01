import swaggerJsdoc from "swagger-jsdoc";

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment API Documentation",
      version: "1.0.0",
      description: "For my LAB7's task it named swagger",
    },
  },
  apis: ["./src/routes/**.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
