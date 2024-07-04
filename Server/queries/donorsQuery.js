import 'dotenv/config'
const db = process.env.DB_NAME;

function getByInactiveFromDate() {
    let fields = queryParams.fields || '*';
    let filter = queryParams.filter || '';
    let limit = queryParams._limit;
    let page = queryParams.page;
    let sortby = queryParams.sortby;

    let dataQuery = `SELECT ${fields} 
    FROM ${db}.donors
    JOIN ${db}.donations ON donations.donor_id = donors.id
    WHERE donations.date < ?`;

    let countQuery = `SELECT COUNT(*) AS total 
    FROM ${db}.donors
    JOIN ${db}.donations ON donations.donor_id = donors.id
    WHERE donations.date < ?`

    if (sortby) {
        dataQuery += ` ORDER BY ${sortby}`;
    }

    if (limit) {
        if (page) {
            const offset = (page - 1) * limit;
            dataQuery += ` LIMIT ${limit} OFFSET ${offset}`;
        } else {
            dataQuery += ` LIMIT ${limit}`;
        }
    }

    return { dataQuery, countQuery };
}

export{
    getByInactiveFromDate
}
