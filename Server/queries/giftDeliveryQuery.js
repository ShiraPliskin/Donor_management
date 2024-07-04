import 'dotenv/config'
const db = process.env.DB_NAME;

function addGiftDeliveryQuery(tableName, numItems) {
    const placeholders = Array(numItems)
        .fill('(?, ?, ?)')
        .join(', ');

    return `INSERT INTO ${tableName} (donor_id, gift_id, date) VALUES ${placeholders}`;
}

export {
    addGiftDeliveryQuery
}