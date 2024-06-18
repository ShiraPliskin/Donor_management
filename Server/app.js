import express from 'express';
import cors from 'cors';
import { donorsRouter } from './router/donorsRouter.js'
import { registerRouter } from './router/registerRouter.js'
import { usersRouter } from './router/usersRouter.js';
import { giftsRouter } from './router/giftsRouter.js';
import { importersRouter } from './router/importersRouter.js';
// import {logErrors} from './middleware/logError.js'

const app = express();
app.use(cors());

app.use(express.json());
app.use('/donors', donorsRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/gifts', giftsRouter);
app.use('/importers', importersRouter);

// app.use(logErrors);


app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});
