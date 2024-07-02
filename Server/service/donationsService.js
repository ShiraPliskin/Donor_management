import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'
import dateFormat from 'dateformat';

export class DonationsService {
    
    async getDonations(queryParams) {
        const {dataQuery, countQuery} = getByConditionQuery("donations",queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getDonationById(id) {
        const query = getByIdQuery("donations");
        const result =  await executeQuery(query, [id]);
        return result;
    }

    async deleteDonation(idKey,idValue) {
        const query = deleteQuery("donations", `${idKey}`);
        const result =  await executeQuery(query, [idValue]);
        return result;
    }

    async updateDonation(updatedItem, id) {
        if(newItem.date !== "")
            newItem.date = dateFormat(newItem.date,"yyyy-mm-dd");
        const query = updateQuery("donations", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addDonation(newItem) {
        if(newItem.date !== "")
            newItem.date = dateFormat(newItem.date,"yyyy-mm-dd");
        const values = Object.values(newItem);
        const query = addQuery("donations", newItem);
        const result =  await executeQuery(query, values);
        return result;
    }
}
