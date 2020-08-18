const express  = require('express');
const mongoose = require('mongoose');

// puerto y base de datos
const port = process.env.PORT        || 3000;
const db   = process.env.MONGODB_URI || 'mongodb+srv://hellodb:hellodb@cluster0.xbhvq.gcp.mongodb.net/hellodb?retryWrites=true&w=majority';

const app = express();

// set views
app.set('view engine', 'pug');
app.set('views', './views');

// router
const router = require('./routes/index');
app.use('/', router);

// conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB conectada @ ${db}`);
  })
.catch(err => console.error(`Error de conexion: ${err}`));

// listen
app.listen(port, () => {
  console.log(`Servidor alojado en el puerto: ${port}`);
});