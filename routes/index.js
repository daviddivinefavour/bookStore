const userRoutes = require('./userRoutes');
module.exports=(app)=>{
    //  app.get('/', (req, res) => {
    //     res.render('index');
    // });
    app.use('/api/v1',userRoutes);
};