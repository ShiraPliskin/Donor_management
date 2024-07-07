import 'dotenv/config'
const db = process.env.DB_NAME;

function getByInactiveFromDate(queryParams) {
    console.log("queryParams.filter",queryParams.filter)

    let fields = queryParams.fields || '*';
    let filter = queryParams.filter || '';
    let limit = queryParams._limit;
    let page = queryParams.page;
    let sortby = queryParams.sortby;

    const filterArray = filter.split(',');
    const [key, value] = filterArray[0].split('=');
    const filterWithoutDate = filterArray.slice(1);

    let dataQuery = `SELECT DISTINCT ${fields}
    FROM ${db}.donors
    WHERE donors.id NOT IN (
    SELECT DISTINCT donors.id
    FROM ${db}.donors
    JOIN ${db}.donations
    ON donations.donor_id = donors.id
    WHERE donations.date >= '${value}')`

    let countQuery = `SELECT DISTINCT COUNT(*) AS total 
    FROM ${db}.donors
    WHERE donors.id NOT IN (
    SELECT DISTINCT donors.id
    FROM ${db}.donors
    JOIN ${db}.donations
    ON donations.donor_id = donors.id
    WHERE donations.date >= '${value}')`

    if (filterWithoutDate.length) {
        dataQuery += ' AND ';
        countQuery += ' AND ';
        const conditionArray = filterWithoutDate.map(condition => {
            const [key, value] = condition.split('=');
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            return `donors.${trimmedKey} = '${trimmedValue}'`;
        });
        dataQuery += conditionArray.join(' AND ');
        countQuery += conditionArray.join(' AND ');
    }

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

export {
    getByInactiveFromDate
}
