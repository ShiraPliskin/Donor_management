import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'

export class ContactsService {

    async getContacts(queryParams) {
        const  { dataQuery, countQuery } = getByConditionQuery("contacts", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getContactById(id) {
        const queryPost = getByIdQuery("contacts");
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async deleteContact(idKey, idValue) {
        const query = deleteQuery("contacts", `${idKey}`);
        const result =  await executeQuery(query, [idValue]);
        return result;
    }

    async updateContact(updatedItem, id) {
        const query = updateQuery("contacts", updatedItem, "id");
        const values = Object.values(updatedItem);
        values.push(id);
        const result = await executeQuery(query, values);
        return result;
    }

    async addContact(newItem) {
        const values = Object.values(newItem);
        const queryUser = addQuery("contacts", newItem);
        const result =  await executeQuery(queryUser, values);
        return result;
    }
}
