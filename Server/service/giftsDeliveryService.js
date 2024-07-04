import { executeQuery } from './db.js'
import {updateQuery, deleteQuery} from '../queries/genericQueries.js'
import {addGiftDeliveryQuery, getByGiftIdQuery, getByDonorIdQuery} from '../queries/giftDeliveryQuery.js'

export class GiftsDeliveryService {

    async getGiftDeliveryByDonorId(id) {
        const query = getByDonorIdQuery();
        const result = await executeQuery(query, [id]);
        return result;
    }

    async getGiftDeliveryByGiftId(id) {
        const query = getByGiftIdQuery();
        const result = await executeQuery(query, [id]);
        return result;
    }

    async deleteGiftDelivery(idKey,idValue) {
        const query = deleteQuery("gift_delivery", `${idKey}`);
        const result =  await executeQuery(query, [idValue]);
        return result;
    }

    async updateGiftDelivery(updatedItem, id) {
        const query = updateQuery("gift_delivery", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addGiftDelivery(newItem) {
        const donorIds = newItem.donor_id;
        const giftId = newItem.gift_id;
        const date = newItem.date;
        const query = addGiftDeliveryQuery(donorIds.length);
                const values = donorIds.reduce((acc, donorId) => {
            acc.push(donorId, giftId, date);
            return acc;
        }, []);
        
        const result = await executeQuery(query, values);
        return result;
    }
}
