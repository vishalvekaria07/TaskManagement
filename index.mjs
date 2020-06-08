
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import routes from './routes/route';


const app = express();




mongoose.connect('mongodb://127.0.0.1:45000/', {useNewUrlParser: true});
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Express app - listening on port 3000' );
});
