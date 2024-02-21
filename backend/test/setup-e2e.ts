import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

import * as path from "path";
import * as fs from "fs";

const prisma = new PrismaClient();
/**
 * Generate a unique database file path for each test run
 * @param schemaId - The unique schema identifier
 */
function generateUniqueDatabasePath(schemaId: string) {
  const databaseFileName = `testdb_${schemaId}.sqlite`;
  return path.join(__dirname, databaseFileName);
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databasePath = generateUniqueDatabasePath(schemaId);
  process.env.DATABASE_URL = `file:${databasePath}`;
  execSync("pnpm prisma migrate deploy");
});

afterAll(async () => {
  // Clean up the SQLite database file after all tests are done
  const databasePath = generateUniqueDatabasePath(schemaId);
  if (fs.existsSync(databasePath)) {
    // Remove the SQLite database file and its journal file
    fs.unlinkSync(databasePath);
    fs.unlinkSync(`${databasePath}-journal`);
  }

  await prisma.$disconnect();
});
