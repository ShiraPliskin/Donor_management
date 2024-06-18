import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'

export class GiftsService {

    async getGifts(queryParams) {
        const query = getByConditionQuery("gifts",queryParams);
        const values = Object.values(queryParams);
        const result = await executeQuery(query, values);
        return result;
    }

    async getGiftById(id) {
        const queryPost = getByIdQuery("gifts");
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async deleteGift(idKey, idValue) {
        const query = deleteQuery("gifts", `${idKey}`);
        const result =  await executeQuery(query, [idValue]);
        return result;
    }

    async updateGift(updatedItem, id) {
        const query = updateQuery("gifts", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addGift(newItem) {
        const values = Object.values(newItem);
        const queryUser = addQuery("gifts", newItem);
        const result =  await executeQuery(queryUser, values);
        return result;
    }
}