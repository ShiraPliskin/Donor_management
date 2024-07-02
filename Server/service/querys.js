import 'dotenv/config'
const db = process.env.DB_NAME;

function getByConditionQuery(tableName, queryParams) {
    let fields = queryParams.fields || '*';
    let filter = queryParams.filter || '';
    let limit = queryParams._limit;
    let page = queryParams.page;
    let sortby = queryParams.sortby;

    let dataQuery = `SELECT ${fields} FROM ${db}.${tableName}`;

    let countQuery = `SELECT COUNT(*) AS total FROM ${db}.${tableName}`;

    if (filter) {
        dataQuery += ' WHERE ';
        countQuery += ' WHERE ';
        const conditionArray = filter.split(',').map(condition => {
            const [key, value] = condition.split('=');
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            return `${trimmedKey} = '${trimmedValue}'`;
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

function getByIdQuery(tableName, idKey = "id") {
    const query = `SELECT * FROM ${db}.${tableName}  where ${idKey} = ?`;
    return query
}

function deleteQuery(table_name, idKey) {
    const query = `DELETE FROM ${db}.${table_name} WHERE  ${idKey} = ?`;
    return query;
}

function updateQuery(table_name, queryParams, idKey) {
    let query = `UPDATE ${db}.${table_name} SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(', ');
    query += ` WHERE ${idKey} = ?`
    return query;
}

function addQuery(table_name, newObj) {
    let query = `INSERT INTO ${db}.${table_name}`
    let keys = [];
    let values = [];
    for (const key in newObj) {
        keys.push(`${key}`);
        values.push("?")
    }
    query += "(" + keys.join(', ') + ")";
    query += "VALUES";
    query += "(" + values.join(', ') + ")";
    return query;
}

function patchQuery(table_name, queryParams, idKey) {
    let query = `UPDATE ${db}.${table_name} SET `;
    const conditions = [];
    for (const key in queryParams) {
        if (key !== idKey) {
            conditions.push(`${key} = ?`);
        }
    }
    query += conditions.join(', ');
    query += ` WHERE ${idKey} = ?`;
    return query;
}

export {
    getByConditionQuery,
    getByIdQuery,
    deleteQuery,
    updateQuery,
    addQuery,
    patchQuery
}
