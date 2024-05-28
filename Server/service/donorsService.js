
import { executeQuery } from './db.js';

export class GenericService {

    async get(queryParams, func) {
        const query = func(queryParams);
        const values = Object.values(queryParams);
        const result = await executeQuery(query, values);
        return result;
    }

    async getById(id, func) {
        const query = func();
        const result =  await executeQuery(query, [id]);
        return result;
    }

    async add(data, func) {
        const query = func();
        const values = Object.values(data);
        const result = await executeQuery(query, values);
        return result;
    }

    async delete(id, func) {
        const query = func();
        const result =  await executeQuery(query, [id]);
        return result;
    }

    async update(updatedItem, id, func) {
        const query = func(updatedItem);
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }
}