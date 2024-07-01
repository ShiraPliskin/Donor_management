import { executeQuery } from './db.js'
import {addQuery, updateQuery, getByIdQuery, getByConditionQuery, deleteQuery} from './querys.js'
import multer from 'multer'
import path from 'path'
export class GiftsService {

    async getGifts(queryParams) {
        const  { dataQuery, countQuery } = getByConditionQuery("gifts",queryParams);
        const values = Object.values(queryParams);
        const data = await executeQuery(dataQuery, values);
        const total = await executeQuery(countQuery, values);
        return { data, total };
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

    async uploadImage(file) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './images');
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
            }
        });
        
        const upload = multer({ storage: storage });

        return new Promise((resolve, reject) => {
            upload.single('image')(file, null, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(file.filename);
                }
            });
        });
    }

    async addGift(newItem, imgSrc) {
        const queryProduct = addQuery("gifts", [...Object.keys(newItem), 'img']);
        const result = await executeQuery(queryProduct, [...Object.values(newItem), imgSrc]);
        return result;
    }
}


