import 'dotenv/config'
const db = process.env.DB_NAME;

function updateGiftsAmount( amount) {
    console.log("updateGiftsAmount");

    return `UPDATE ${db}.gifts set amount = amount - ${amount} WHERE id = ?`;
}

export {updateGiftsAmount}