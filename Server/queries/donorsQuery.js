import 'dotenv/config'
const db = process.env.DB_NAME;

function getByInactiveFromDate(queryParams) {
    let fields = queryParams.fields || '*';
    let filter = queryParams.filter || '';
    let limit = queryParams._limit;
    let page = queryParams.page;
    let sortby = queryParams.sortby;

    const [key, value] = filter.split('=');

    let dataQuery = "SELECT DISTINCT";

    const fieldsArray = fields.split(', ').map(field => {
        return ` donors.${field}`;
    });
    
    const fieldsString = fieldsArray.join(', ');
   
    dataQuery += fieldsString; 

    dataQuery += ` FROM ${db}.donors
    JOIN ${db}.donations ON donations.donor_id = donors.id
    WHERE donations.date > ${value}`;

    let countQuery = `SELECT DISTINCT COUNT(*) AS total 
    FROM ${db}.donors
    JOIN ${db}.donations ON donations.donor_id = donors.id
    WHERE donations.date > ${value}`

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
    console.log(dataQuery)

    return { dataQuery, countQuery };
}

export{
    getByInactiveFromDate
}
