import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery,patchQuery} from '../queries/genericQueries.js'
import { DonationsService} from './donationsService.js'
import { GiftsDeliveryService} from './giftsDeliveryService.js'
const giftsDeliveryService = new GiftsDeliveryService;
const donationsService = new DonationsService;

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
        await giftsDeliveryService.deleteGiftDelivery("donor_id", idValue);
        await donationsService.deleteDonation("donor_id", idValue);
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

    async patchDonor(updatedFields,id) {
        const query = patchQuery("donors", updatedFields, "id");
        const values = Object.values(updatedFields);
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
