const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const fs = require("fs");



// Define your documentation options
const doc = {
  info: {
    version: "1.0.0",
    title: "Your API Documentation",
    description: "API documentation generated dynamically using swagger-autogen",
  },
  host: "localhost:5000", // Update with your server host
  basePath: "/", // Update with your base path
  schemes: ["http"], // Update with your schemes (http, https, etc.)
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    // Define your API tags
    {
      name: "Authentication",
      description: "Endpoints for user authentication",
    },
    {
      name: "Chat",
      description: "Endpoints for chat functionality",
    },
    // Add more tags as needed
  ],
  securityDefinitions: {}, // Define security definitions if needed
  definitions: {}, // Initialize definitions object (Swagger 2.0 style)
  components: {
    schemas: {}, // Initialize schemas object (OpenAPI 3.x style)
  },
};

// Function to generate Swagger documentation
async function generateSwagger() {

  // Specify your endpoint files (adjust as needed)
  const endpointsFiles = ["./routes/*.js"]; // Example path to your endpoint files

  // Output file path
  const outputFile = "./swagger-output.json";

  try {
    await swaggerAutogen(outputFile, endpointsFiles, doc);
    console.log("Swagger documentation generated successfully!");
  } catch (error) {
    console.error("Error generating Swagger documentation:", error);
  }
}

// Call the function to generate Swagger documentation
generateSwagger();
