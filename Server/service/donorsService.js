import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'

export class DonorsService {

    async getDonors(queryParams) {
        const query = getByConditionQuery("donors",queryParams);
        const values = Object.values(queryParams);
        const result = await executeQuery(query, values);
        return result;
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
