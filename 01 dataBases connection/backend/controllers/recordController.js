const dbManager = require('../database/manager');

const getRecords = async (req, res) => {
    try {
        const records = await dbManager.getAll();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRecord = async (req, res) => {
    try {
        const { targets, ...data } = req.body;
        const record = await dbManager.create(data, targets);
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRecord = async (req, res) => {
    try {
        const record = await dbManager.update(req.params.id, req.body);
        res.json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRecord = async (req, res) => {
    try {
        await dbManager.remove(req.params.id);
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const switchDatabase = async (req, res) => {
    const { dbType } = req.body;
    try {
        await dbManager.setDatabase(dbType);
        res.json({ message: `Database switched to ${dbType}`, currentDB: dbType });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStatus = (req, res) => {
    res.json({
        currentDB: dbManager.getCurrentDB(),
        status: 'Connected'
    });
};

module.exports = {
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    switchDatabase,
    getStatus
};
