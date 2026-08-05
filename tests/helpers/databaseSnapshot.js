const db = require('../../src/models/db');

function restoreDatabase() {
  db.clearDb();
}

module.exports = { restoreDatabase };
