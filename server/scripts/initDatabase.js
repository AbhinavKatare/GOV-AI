const { initializeDatabase } = require('../config/initDb');

console.log('🚀 Initializing GovAI database...\n');

initializeDatabase()
    .then(() => {
        console.log('\n✅ Database initialized successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Database initialization failed:', error);
        process.exit(1);
    });
