import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery, addManyItemsQuery} from './querys.js'

export class GiftsDeliveryService {

    async getGiftsDelivery(queryParams) {
        const  { dataQuery, countQuery } = getByConditionQuery("gift_delivery", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getGiftDeliveryById(id) {
        const query = getByIdQuery("gift_delivery");
        const result =  await executeQuery(query, [id]);
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
        const query = addManyItemsQuery("gift_delivery", donorIds.length);
                const values = donorIds.reduce((acc, donorId) => {
            acc.push(donorId, giftId, date);
            return acc;
        }, []);
        
        const result = await executeQuery(query, values);
        return result;
    }
}
