import express from 'express';
import cors from 'cors';
import { donorsRouter } from './router/donorsRouter.js'
import { registerRouter } from './router/registerRouter.js'
import { usersRouter } from './router/usersRouter.js';
import { giftsRouter } from './router/giftsRouter.js';
import { importersRouter } from './router/importersRouter.js';
import { contactsRouter } from './router/contactsRouter.js';
import { giftsDeliveryRouter } from './router/giftsDeliveryRouter.js';
import { donationsRouter } from './router/donationsRouter.js';
import bodyparser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/donors', donorsRouter);
app.use('/donations', donationsRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/gifts', giftsRouter);
app.use('/importers', importersRouter);
app.use('/contacts', contactsRouter);
app.use('/giftsDelivery', giftsDeliveryRouter);

app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});