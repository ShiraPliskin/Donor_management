import express from 'express';
import cors from 'cors';
// import { userRouter } from './router/userRouter.js'
// import { passwordRouter } from './router/passwordRouter.js'
import { donorsRouter } from './router/donorsRouter.js'
import { registerRouter } from './router/registerRouter.js'

// import {logErrors} from './middleware/logError.js'
const app = express();
app.use(cors());

app.use(express.json());
// app.use('/users', userRouter);
// app.use('/passwords', passwordRouter);
app.use('/donors', donorsRouter);
app.use('/register', registerRouter);

// app.use(logErrors);


app.listen(8080, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8080);
});
