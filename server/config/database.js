const Database = require('better-sqlite3');
const path = require('path');

// Database file stored in server/data/govai.db
const DB_PATH = path.join(__dirname, '..', 'data', 'govai.db');

// Create data directory if it doesn't exist
const fs = require('fs');
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/**
 * Wrapper to mimic pg's query(text, params) interface.
 * better-sqlite3 is synchronous, so we return a resolved promise
 * to keep all route handlers working without changes.
 */
const query = (text, params = []) => {
    // Convert $1, $2, … placeholders to ? for SQLite
    const sqliteText = text.replace(/\$(\d+)/g, '?');

    // Detect query type
    const trimmed = sqliteText.trim().toUpperCase();

    if (trimmed.startsWith('SELECT') || trimmed.startsWith('WITH')) {
        const stmt = db.prepare(sqliteText);
        const rows = stmt.all(...params);
        return Promise.resolve({ rows, rowCount: rows.length });
    } else if (trimmed.startsWith('INSERT') && sqliteText.toUpperCase().includes('RETURNING')) {
        // SQLite doesn't support RETURNING natively in all versions
        // Use lastInsertRowid + a SELECT
        const withoutReturning = sqliteText.replace(/\s+RETURNING\s+.*/i, '');
        const returningMatch = text.match(/RETURNING\s+(.*)/i);
        const returningCols = returningMatch ? returningMatch[1].trim() : '*';

        const stmt = db.prepare(withoutReturning);
        const info = stmt.run(...params);
        const lastId = info.lastInsertRowid;

        // Guess table name from INSERT INTO tablename
        const tableMatch = sqliteText.match(/INSERT\s+(?:OR\s+\w+\s+)?INTO\s+"?(\w+)"?/i);
        const tableName = tableMatch ? tableMatch[1] : null;

        let row = null;
        if (tableName && lastId) {
            const selStmt = db.prepare(`SELECT * FROM "${tableName}" WHERE rowid = ?`);
            row = selStmt.get(lastId);
        }

        return Promise.resolve({ rows: row ? [row] : [], rowCount: info.changes });
    } else {
        const stmt = db.prepare(sqliteText);
        const info = stmt.run(...params);
        return Promise.resolve({ rows: [], rowCount: info.changes });
    }
};

console.log(`✅ SQLite database connected: ${DB_PATH}`);

module.exports = { query, db };
