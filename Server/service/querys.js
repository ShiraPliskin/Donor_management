import 'dotenv/config'
const db = process.env.DB_NAME;

function getByConditionQuery(tableName, queryParams) {
    let fields = queryParams.fields || '*';
    let filter = queryParams.filter || '';
    let limit = queryParams._limit;

    let query = `SELECT ${fields} FROM ${db}.${tableName}`;

    if (filter) {
        query += ' WHERE ';
        const conditionArray = filter.split(',').map(condition => {
            const [key, value] = condition.split('=');
            return `${key.trim()} = '${value.trim()}'`;
        });
        query += conditionArray.join(' AND ');
    }

    if (limit) {
        query += ` LIMIT ${limit}`;
    }

    return query;
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
    console.log(query)
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

export {
    getByConditionQuery,
    getByIdQuery,
    deleteQuery,
    updateQuery,
    addQuery
}
