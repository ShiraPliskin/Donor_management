import { executeQuery } from './db.js'
import { addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery } from '../queries/genericQueries.js'
import { DonorsService } from './donorsService.js'
const donorsService = new DonorsService
export class ContactsService {

    async getContacts(queryParams) {
        const { dataQuery, countQuery } = getByConditionQuery("contacts", queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
    }

    async getContactById(id) {
        const queryPost = getByIdQuery("contacts");
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async deleteContact(idKey, idValue) {
        const donors = await donorsService.getDonors({ filter: `contact_id=${idValue}` });
        for (const donor of donors.data) {
            console.log("donor  " + donors.data.id);
            await donorsService.patchDonor({ contact_id: null }, donor.id);
        }
        const query = deleteQuery("contacts", `${idKey}`);
        const result = await executeQuery(query, [idValue]);
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
        const result = await executeQuery(queryUser, values);
        return result;
    }
}
