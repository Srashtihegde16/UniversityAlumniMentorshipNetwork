
module.exports = (err, req, res, next) => {
    console.error(err.code || '', err.message);

    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }

    switch (err.errno) {
        case 1062:
            return res.status(409).json({
                error: 'Duplicate value: record already exists'
            });

        case 1452:
            return res.status(400).json({
                error: 'Invalid reference: related record does not exist'
            });

        case 1451:
            return res.status(409).json({
                error: 'Cannot delete: record is in use'
            });

        case 1644:
            return res.status(400).json({ error: err.sqlMessage });

        case 3819:
        case 4025:
            return res.status(400).json({
                error: 'Value out of allowed range'
            });

        case 1265:
        case 1366:
            return res.status(400).json({
                error: 'Invalid value supplied'
            });
    }

    res.status(500).json({ error: 'Internal server error' });
};
