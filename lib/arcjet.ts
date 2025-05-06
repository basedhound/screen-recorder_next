import arcjet, { detectBot, fixedWindow, shield, request } from "@arcjet/next";
import { getEnv } from "./utils";

// Re-export the rules to simplify imports inside handlers
export { detectBot, fixedWindow, shield, request };

// Create a base Arcjet instance 
export default arcjet({
  key: getEnv("ARCJET_API_KEY"),
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 2,
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "G00G1E_CRAWLER"], // allow other bots if you want to.
    }),
  ],
});
