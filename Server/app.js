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
import {authenticateToken} from './middleware/authenticateToken.js';
import { forgotPasswordRouter } from './router/forgotPasswordRouter.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/donors',authenticateToken,donorsRouter);
app.use('/donations',authenticateToken, donationsRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/gifts',authenticateToken, giftsRouter);
app.use('/importers',authenticateToken, importersRouter);
app.use('/contacts',authenticateToken, contactsRouter);
app.use('/giftsDelivery',authenticateToken, giftsDeliveryRouter);
app.use('/register/forgotPassword', forgotPasswordRouter);

app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});