import { executeQuery } from '../db.js'
import {addQuery,updateQuery,getByIdQuery,getByConditionQuery,deleteQuery} from './querys.js'

export class DonorsService {


    async getDonors(queryParams) {
        const query = getByConditionQuery("donors",queryParams);
        const values = Object.values(queryParams);
        const result = await executeQuery(query, values);
        return result;
    }

    async getDonorById(id) {
        const queryPost = getByIdQuery("donors");
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async deleteDonor(idKey,idValue) {
        console.log(idValue);
        const queryDonor = deleteQuery("donors",`${idKey}`);
        const result =  await executeQuery(queryDonor, [idValue]);
        return result;
    }

    async updateDonor(updatedItem) {
        const query = updateQuery("donors",updatedItem,"id");
        const values = Object.values(updatedItem);
        values.push(updatedItem.id);
        const result = await executeQuery(query, values);
        return result;
    }
    

    async addDonor(newDonor) {
        const values = Object.values(newDonor);
        const queryUser = addQuery("donors",newDonor);
        const result =  await executeQuery(queryUser, values);
        return result;
    }

}































