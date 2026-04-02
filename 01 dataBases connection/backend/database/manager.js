const sqlite = require('./sqlite');
const supabase = require('./supabase');
const mongodb = require('./mongodb');

let currentDB = 'sqlite'; // Default
let drivers = {
    sqlite,
    supabase,
    mongodb
};

let activeDriver = drivers[currentDB];

const setDatabase = async (dbType) => {
    if (!drivers[dbType]) {
        throw new Error(`Invalid database type: ${dbType}`);
    }

    try {
        await drivers[dbType].connect();
        currentDB = dbType;
        activeDriver = drivers[dbType];
        console.log(`Switched to ${dbType} successfully.`);
        return { success: true, dbType };
    } catch (error) {
        console.error(`Failed to switch to ${dbType}:`, error.message);
        throw error;
    }
};

const getActiveDriver = () => activeDriver;
const getCurrentDB = () => currentDB;

// Initialize with default
sqlite.connect().catch(err => console.error("Initial SQLite connection failed", err));

module.exports = {
    setDatabase,
    getActiveDriver,
    getCurrentDB,
    // Delegate CRUD operations to active driver
    getAll: () => activeDriver.getAll(),
    create: async (data, targets = []) => {
        if (!targets || targets.length === 0) {
            return activeDriver.create(data);
        }

        const results = [];
        for (const target of targets) {
            if (drivers[target]) {
                try {
                    // Ensure the target is connected
                    await drivers[target].connect();
                    const result = await drivers[target].create(data);
                    results.push(result);
                } catch (err) {
                    console.error(`Failed to sync with ${target}:`, err.message);
                }
            }
        }
        return results[0] || activeDriver.create(data);
    },
    update: (id, data) => activeDriver.update(id, data),
    remove: (id) => activeDriver.remove(id)
};
