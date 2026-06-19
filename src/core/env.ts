// config/env.ts
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function must(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Env ${name} is missing`);
  return val;
}

export const NODE_ENV = must("NODE_ENV");

export const API_KEY = must("API_KEY");
export const CORS_ORIGINS = must("CORS_ORIGINS");
export const MAIL_ADRESS = must("MAIL_ADRESS");
export const MAIL_PASSWORD = must("MAIL_PASSWORD");
export const MAIL_HOST = must("MAIL_HOST");

export const PORT = must("APPLICATION_PORT");
