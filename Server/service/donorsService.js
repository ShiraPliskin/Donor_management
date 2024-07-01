import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'

export class DonorsService {

    async getDonors(queryParams) {
        const  { dataQuery, countQuery } = getByConditionQuery("donors", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getDonorById(id) {
        const query = getByIdQuery("donors");
        const result =  await executeQuery(query, [id]);
        return result;
    }

    async deleteDonor(idKey,idValue) {
        const query = deleteQuery("donors", `${idKey}`);
        const result =  await executeQuery(query, [idValue]);
        return result;
    }

    async updateDonor(updatedItem, id) {
        const query = updateQuery("donors", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addDonor(newItem) {
        const values = Object.values(newItem);
        const query = addQuery("donors", newItem);
        const result =  await executeQuery(query, values);
        return result;
    }
}
