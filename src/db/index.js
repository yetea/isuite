const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
let globalForDb = globalThis || {};
globalForDb.conn = globalForDb.conn || undefined;

// Replace the database URL string with your actual PostgreSQL URL
const conn = globalForDb.conn || postgres("postgresql://postgres:1q2w3e4r@localhost:5432/isuite");
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn);

module.exports = {
  db,
};
