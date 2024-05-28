import 'dotenv/config'
const db = process.env.DB_NAME;

function getByConditionQuery(tableName, queryParams){
    let query = `SELECT * FROM ${db}.${tableName}`;
    if (Object.keys(queryParams).length == 1 && Object.keys(queryParams)[0] == "_limit") { 
        query += ' LIMIT ? ';
        return query
    }
    if (Object.keys(queryParams).length > 0) {
        query += ' WHERE ';
        const conditions = [];
        for (const key in queryParams) {
            conditions.push(`${key} = ?`);
        }
        query += conditions.join(' AND ');    }
    return query;
}

// function getQuery(table_name,limit,start,sort,whereIsActive = "") {
//     console.log("in get query sort: "+ sort);
//     const query = `SELECT * FROM ${db}.${table_name} ${whereIsActive} ORDER BY ${sort} LIMIT ${limit} OFFSET ${start}`;
//     return query
// }


function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${db}.${tableName}  where id = ?`;
    return query
}

// function getByIdQuery(table_name,idParameter,limit,start,sort) {
//     const query = `SELECT * FROM ${db}.${table_name}  where ${idParameter} = ? ORDER BY ${sort} LIMIT ${limit} OFFSET ${start}`;
//     return query
// }
function deleteQuery(table_name,idKey){
    const query=`DELETE FROM ${db}.${table_name} WHERE  ${idKey} = ?`;
    return query;
}
// function updateQuery(table_name,values,idParameter){
//     const query=`UPDATE ${db}.${table_name} SET ${values}  WHERE ${idParameter}=?`;
//     return query;
// }

function updateQuery(table_name, queryParams, idKey) {
    let query = `UPDATE ${db}.${table_name} SET `;
    const conditions = [];
    for (const key in queryParams) {
        conditions.push(`${key} = ?`);
    }
    query += conditions.join(', ');
    query +=  ` WHERE ${idKey} = ?`
    console.log(query)
    return query;
}

function addQuery(table_name, newDonor){
    let query=`INSERT INTO ${db}.${table_name}`
    let keys = [];
    let values = [];
    for (const key in newDonor) {
        keys.push(`${key}`);
        values.push("?")
    }
    query += "(" + keys.join(', ') + ")";
    query += "VALUES";
    query += "(" + values.join(', ') + ")";
    return query;
}

export{
    getByConditionQuery,
    getByIdQuery,
    deleteQuery,
    updateQuery,
    addQuery
}
