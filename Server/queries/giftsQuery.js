import 'dotenv/config'
const db = process.env.DB_NAME;

function updateGiftsAmount( amount) {
    return `UPDATE ${db}.gifts set amount = amount - ${amount} WHERE id = ?`;
}

export {updateGiftsAmount}