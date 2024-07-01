import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'

export class ImportersService {

    async getImporters(queryParams) {
        const {dataQuery, countQuery} = getByConditionQuery("importers", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getImporterById(id) {
        const queryPost = getByIdQuery("importers");
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async deleteImporter(idKey, idValue) {
        const query = deleteQuery("importers", `${idKey}`);
        const result =  await executeQuery(query, [idValue]);
        return result;
    }

    async updateImporter(updatedItem, id) {
        const query = updateQuery("importers", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addImporter(newItem) {
        const values = Object.values(newItem);
        const queryUser = addQuery("importers", newItem);
        const result =  await executeQuery(queryUser, values);
        return result;
    }
}
