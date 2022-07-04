const mongoose = require('mongoose');
const dbURI = process.env.DATABASE_URI;
mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
    })
    .catch((err) => {
      console.log('----------Cannot connect to the database!--------', err);
      process.exit();
    });
mongoose.connection.on('open', () => console.log('MongoDB connected'));

module.exports = mongoose;
