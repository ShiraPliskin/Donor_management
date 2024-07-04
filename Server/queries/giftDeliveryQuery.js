import 'dotenv/config'
const db = process.env.DB_NAME;

function addGiftDeliveryQuery(tableName, numItems) {
    const placeholders = Array(numItems)
        .fill('(?, ?, ?)')
        .join(', ');

    return `INSERT INTO ${db}.gift_delivery (donor_id, gift_id, date) VALUES ${placeholders}`;
}

function getByDonorIdQuery(){
    const query = `SELECT g.description, gd.date
    FROM ${db}.gift_delivery gd
    JOIN ${db}.gifts g ON gd.gift_id = g.id
    WHERE gd.donor_id = ?
    ORDER BY gd.date;`
    return query;
}

function getByGiftIdQuery(){
    const query = `SELECT d.id, d.f_name, d.l_name, gd.date
    FROM ${db}.gift_delivery gd
    JOIN ${db}.donors d ON gd.donor_id = d.id
    WHERE gd.gift_id = ?
    ORDER BY gd.date;`
    return query;
}

export {
    addGiftDeliveryQuery,
    getByDonorIdQuery,
    getByGiftIdQuery
}