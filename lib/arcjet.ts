//arcjet recommend creating a single instance of the Arcjet object and reusing it throughout your application. 
//This is because the SDK caches decisions and configuration to improve performance.
//https://docs.arcjet.com/reference/nextjs#single-instance
import arcjet, {
  detectBot,
  fixedWindow,
  shield,
  request,
  validateEmail,
  slidingWindow,
  ArcjetDecision,
  createMiddleware,
} from "@arcjet/next";
import { getEnv } from "./utils";

// Re-export the rules to simplify imports inside handlers
export {
  detectBot,
  fixedWindow,
  shield,
  request,
  slidingWindow,
  validateEmail,
  createMiddleware,
  ArcjetDecision,
};

// Create a base Arcjet instance for use by each handler
const aj = arcjet({
  key: getEnv("ARCJET_API_KEY"),
  rules: [],
});

export default aj;
